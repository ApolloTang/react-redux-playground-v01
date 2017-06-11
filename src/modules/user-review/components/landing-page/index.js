import React, {Component} from 'react';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

import style from './style';
class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`landingPage ${style['module-style']}`} >
              Please select a user
            </div>
        );
    }
}

export default Layout;

