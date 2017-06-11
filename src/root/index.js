
import React from 'react';

import { ConnectedRouter } from 'connected-react-router';
import {history} from './createHistory';

import store from './store';
import { Provider } from 'react-redux';



import App from 'modules/app';
import {routes, navigationDirective} from './routes';
import SimpleNavigation from 'widgets/simple-navigation';

import style from './style';

const Root = ()=>(
    <div className={`root ${style['module-style']}`}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App
                    Navigation={ <SimpleNavigation navigations={navigationDirective}/> }
                    routes={routes}
                />
            </ConnectedRouter>
        </Provider>
    </div>
 );

export default Root;

