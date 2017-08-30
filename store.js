import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// import todoReducer from './reducers/TodoReducer.js';
import rootReducer from './reducers/rootReducer.js';

// NEEDED: Add middleware

// export default function configureStore(initialState = { todos:[] }) {
//     return createStore(todoReducer, initialState);
// }

// export default function configureStore() {
//     return createStore(todoReducer);
// }

// const store = createStore(todoReducer);

const createStoreWithMiddleware = compose(
    applyMiddleware(
        createLogger(/*config*/),
        thunk
        // add more middleware
    )
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export { store };


// const createStoreWithMiddleware = applyMiddleware(
//   thunk,
//   reduxRouterMiddleware
//   //logger
// )(createStore);
