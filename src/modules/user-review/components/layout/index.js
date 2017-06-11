import React, {Component} from 'react';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

import style from './style';
class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`userReview_layout ${style['module-style']}`} >
              <div className="leftPannel">
                <div className="scroll-content">{this.props.UserCatelog}</div>
              </div>
              <div className="gut"/>
              <div className="rightPannel">

                <div className="head">
                  <div className="head-content">{this.props.FunctionNavigation}</div>
                </div>
                <div className="h-gut" />
                <div className="body">
                  <div className="body-content">{this.props.routes}</div>
                </div>
              </div>
            </div>
        );
    }
}

export default Layout;

