import {PROD, shouldPersistStoreState } from  './config';

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import middleware from  './middleware';

import {history} from 'root/createHistory';
import { connectRouter } from 'connected-react-router';

import { saveState, loadState as loadPersistedState } from './local-storage';
const preloadedState = loadPersistedState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store;

// Production
if (PROD) {
    if (shouldPersistStoreState && preloadedState) {
        store = createStore(
            connectRouter(history)(rootReducer),
            preloadedState,
            applyMiddleware(...middleware)
        );
    } else {
        store = createStore(
            connectRouter(history)(rootReducer),
            applyMiddleware(...middleware)
        );
    }
}

// Development
if (!PROD) {
    if (shouldPersistStoreState && preloadedState) {
        store = createStore(
            connectRouter(history)(rootReducer),
            preloadedState,
            composeEnhancers(
                applyMiddleware(...middleware)
            )
        );
    } else {
        store = createStore(
            connectRouter(history)(rootReducer),
            composeEnhancers(
                applyMiddleware(...middleware)
            )
        );
    }
}


window.addEventListener('beforeunload', cb_saveStateToLocalStorage);
export default store;



function cb_saveStateToLocalStorage(e) {
    if (shouldPersistStoreState) {
        saveState( store.getState() );
        return null;
    }
    return null;
    // http://stackoverflow.com/questions/7255649/window-onbeforeunload-not-working
};

