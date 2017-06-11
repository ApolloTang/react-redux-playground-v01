if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/modules/app/index.js'); // eslint-disable-line no-console
}

import React, {Component} from 'react';

import style from './style';
const App = ({Navigation, routes}) =>(
        <div className={`app ${style['module-style']}`} >
            <div className="app-navigation-container">
                {Navigation}
            </div>
            <div className="app-workspace">
                {routes}
            </div>
        </div>
);

export default App;
