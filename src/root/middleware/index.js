import {TEST, PROD, isOnForTest_reduxLogger} from 'root/config';

import {history} from 'root/createHistory';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

const middleware = [
    thunk,
    routerMiddleware(history), // for dispatching history actions
];

if (
  (TEST && isOnForTest_reduxLogger)
  || (!PROD && !TEST)
) {
    middleware.push(
        createLogger()
    );
}

export default middleware;

