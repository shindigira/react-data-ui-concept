import { CREATE_USER_ID } from '../actions/UserActions.js';

const initialState = {
	user: {
        username: 'kurt',
        id: 13
    }
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER_ID:
            return Object.assign({}, state, {
                user: {
                    username: state.user.username,
                    id: action.id
                }
            });
        default:
            return state;

    }
}
