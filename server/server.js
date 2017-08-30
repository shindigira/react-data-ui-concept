var express = require('express');
var app = express();
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');

// allows for hooking into an express app
var webpackDevMiddleware = require('webpack-dev-middleware');
// allows hotloading
var webpackHotMiddleware = require('webpack-hot-middleware');

// takes the webpack.config.js settings
var compiler = webpack(config);

// simulates building of bundle.js but not actual one built in /dist
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));

app.use('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});

var port = 9765;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
