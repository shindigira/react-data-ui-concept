// Card.js

import React, { PropTypes } from 'react';
import lightbox from 'DecipherNow/uikit-decipher-theme/js/components/lightbox';
import TimeAgo from 'react-timeago';
import _ from 'lodash';

import { getRuntimeConfig, isJustMe, ownedBy } from '../util/helpers.js';
import FileIcon from './FileIcon';
import FileSize from './FileSize';
import SharingIcon from './SharingIcon';
import AppConfig from '../appConfig';
import CapcoLite from 'capco-ui/lib/react/capcoLite';

export default class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  _getItemTitle(item) {
    const { visibility } = this.props;
    if(_.includes(AppConfig.searchViews, visibility)) {
      return item.finderTitle;
    } else {
      return item.title ? item.title.value : 'No Title'
    }
  }

  _getContentType(item) {
    const { visibility } = this.props;
    if(item.type === 'Folder') {
      return 'Folder';
    } else if(_.includes(AppConfig.searchViews, visibility)) {
      return item.contentType;
    } else {
      return item.content.type
    }
  }

  _getAttributes(item) {
    let fileType;
    const { visibility } = this.props;
    const unsupportedType = 'unsupported-mapping-type';

    if(item.type === 'Folder' && isJustMe(item)) {
      fileType = 'Folder';
    } else if (item.type === 'Folder') {
      fileType = 'Shared Folder';
    } else if (_.includes(AppConfig.searchViews, visibility)) {
      // data from search interface is different vice from odrive
      fileType = item.contentType;
    } else {
      fileType = item.content.type;
    }

    // possible unsupported mime types that's not yet supported from our internal mapping within settings.json
    // falls back to generic type.
    fileType = fileType ? fileType : unsupportedType;
    let fileDefinition = getRuntimeConfig().types.find(type => type.contentType === fileType);

    // if for some reason the fileType does not exist in current file type mapping, fall back to unsupported type.
    fileDefinition = fileDefinition ? fileDefinition : getRuntimeConfig().types.find(type => type.contentType === unsupportedType);

    const isImage = getRuntimeConfig().contentTypeToMime.photos.includes(fileDefinition.contentType);
    const isVideo = getRuntimeConfig().contentTypeToMime.video.includes(fileDefinition.contentType);

    let mediaType = '';
    if (isImage) { mediaType = 'image'; }
    if (isVideo) { mediaType = 'video'; }
    return { fileType, mediaType };
 }

  _getContentUrl(id) {
    return `${window.location.origin}${getRuntimeConfig().objectServiceEndpoint}/objects/${id}/stream`;
  }

  render() {
    const { item, viewMode, visibility } = this.props;
    const { fileType, mediaType } = this._getAttributes(item);
    return (
      <div
        className={`uk-panel selectable card ${this.props.selected ? 'selected' : ''}`}
        onMouseOut={this.props.onMouseOut}
        onMouseOver={this.props.onMouseOver}
      >
        {/* If the file is an image and located in Home or Share views, the image will be shown -Sigmund */}
        {item.type !== 'Folder' && mediaType === 'image' && visibility !== 'trashed' &&
          <div className="preview thumbnail">
            <a
              title={item.title ? item.title.value : 'No Title'}
              data-uk-lightbox="{duration: 200, group: 'items'}"
              data-lightbox-type={mediaType}
              href={this._getContentUrl(item.id)}
            >
              <img
                alt={_.includes(AppConfig.searchViews, visibility) ? item.finderTitle : item.title.value}
                src={this._getContentUrl(item.id)}
              />
            </a>
          </div>
        }
        {/* If the file is an image and located in the Trash view, the image will be replaced with a file icon -Sigmund */}
        {item.type !== 'Folder' && mediaType === 'image' && visibility === 'trashed' &&
      		<div className="preview icon">
             <a
              href={this._getContentUrl(item.id)}
              title={this._getItemTitle(item)}
            >
              <FileIcon
                fileType={fileType}
                imgStyle={{
                  height: 'initial',
                  width: 'initial'
                }}
                location={this.props.location}
                style={{
                  position: 'relative',
                  right: '2.5%'
                }}
              />
            </a>
          </div>
        }
        {item.type !== 'Folder' && mediaType === 'video' &&
          <div className="preview icon">
            <a
              href={this._getContentUrl(item.id)}
              title={item.title ? item.title.value : 'No Title'}
              data-uk-lightbox="{duration: 200, group: 'items'}"
              data-lightbox-type={mediaType}
            >
              <FileIcon
                fileType={fileType}
                imgStyle={{
                  height: 'initial',
                  width: 'initial'
                }}
                location={this.props.location}
                style={{
                }}
              />
            </a>
          </div>
        }
        {item.type !== 'Folder' && mediaType !== 'image' && mediaType !== 'video' &&
          <div className="preview icon">
            <a
              href={this._getContentUrl(item.id)}
              title={this._getItemTitle(item)}
            >
              <FileIcon
                fileType={fileType}
                imgStyle={{
                  height: 'initial',
                  width: 'initial'
                }}
                location={this.props.location}
                style={{
                  position: 'relative',
                  right: '2.5%'
                }}
              />
            </a>
          </div>
        }
        {(item.type === 'Folder' || item.type === 'Shared Folder') &&
          <div className="preview icon">
            <FileIcon
              fileType={fileType}
              imgStyle={{
                height: 'initial',
                width: 'initial',
                padding: '0'
              }}
              style={{
              }}
              location={this.props.location}
            />
          </div>
        }
        {/* We need to address accessibility i.e. this div needs to be in the tab order. ~David */}
        <div
          className="card-selection-area"
          aria-pressed="false"
          onClick={this.props.onClick}
          role="button"
        >
          {!AppConfig.capcoDisabled &&
            <div className="capco">
              <CapcoLite acm={item.acm && item.acm.portion ? item.acm : {classif: ''}} style={{}}>
                <span>{item.acm && item.acm.portion ? getRuntimeConfig().capcoBackgroundStyle ? item.acm.portion : '(' + item.acm.portion + ')' : ''}</span>
              </CapcoLite>
            </div>
          }
          <div className="caption">
            <FileIcon
              fileType={fileType}
              location={this.props.location}
              render='title'
              title={item}
              imgStyle={{
                height: 'inherit',
                width: 'inherit'
              }}
            />
            {item.type === 'Folder' &&
              <a className="item-title" onClick={this.props.onTitleClick}>
                {this._getItemTitle(item)}
              </a>
            }
            {item.type !== 'Folder' &&
              <span className="item-title">{this._getItemTitle(item)}</span>
            }
            <SharingIcon
              checkPermission={this.props.checkPermission}
              ownedByUserToken={item.ownedBy}
              selectedItem={item}
              shareOpen={() => true}
              styles={{}}
            />
          </div>
          {viewMode === 'largecardview' &&
            <div className="meta">
              <p className="key">Content Type</p>
              <p className="value" title={this._getContentType(item)}>{this._getContentType(item)}</p>
              <p className="key">Owner</p>
              <p className="value">{this.props.owner ? this.props.owner : '—'}</p>
              <p className="key">Last Modified</p>
              <p className="value">
                <TimeAgo
                  date={item.modifiedDate}
                  live={false}
                  />
              </p>
            </div>
          }
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  checkPermission: PropTypes.func,
  draggable: PropTypes.bool,
  index: PropTypes.number,
  item: PropTypes.object,
  location: PropTypes.string,
  onClick: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onTitleClick: PropTypes.func,
  owner: PropTypes.string,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  viewMode: PropTypes.string,
  visibility: PropTypes.string.isRequired,
};
