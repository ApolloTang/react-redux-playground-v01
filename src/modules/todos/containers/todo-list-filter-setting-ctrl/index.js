import React, {Component} from 'react';
import {connect} from 'react-redux';

import { push } from 'connected-react-router'
import {history} from 'root/createHistory';

import {mapStoreToProps, mapDispatchToProps} from './selector';
import style from './style';

function getPath(paramsFilterType, routingPathName) {
    // For example:
    //     routingPathName can be: '/aaa/bbb/ccc/:filterType' or '/aaa/bbb/ccc'
    //     this function will always return the path: '/aaa/bbb/ccc'
    if (routingPathName === void 0) return void 0;
    const pathParts = routingPathName.split('/');
    (paramsFilterType) ? pathParts.pop() : pathParts;
    const path = pathParts.join('/');
    return path;
}

class TodoListFilterSettingCtrl extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const paramsFilterType = _.get(this.props, `params.filterType`, void 0);
        const routingPath = _.get(this.props, `routing.pathname`, void 0);
        this.path=getPath(paramsFilterType, routingPath);
    }

    componentWillReceiveProps(nextProps) {
        const paramsFilterType = _.get(nextProps, `params.filterType`, void 0);
        const routingPath = _.get(nextProps, `routing.pathname`, void 0);
        this.path=getPath(paramsFilterType, routingPath);
    }

    handleNavigate() {
        const path = this.path;
        if (path) {
            const navigateTo = `${path}/${this.props.filterType}`;

            // history.push(navigateTo);
            this.props.dispatch_navigate(navigateTo)
        }
    }

    render() {
        const paramsFilterType = _.get(this.props, `params.filterType`, void 0);
        const ownFilterType = this.props.filterType;
        // console.log('ownFilterType: ', ownFilterType)
        // console.log('paramsFilterType: ', paramsFilterType)
        const isActive =
            ((ownFilterType === paramsFilterType) ||
            ((paramsFilterType === void 0) && (ownFilterType === 'all')) )
            ? true : false;

        return (
            <div className={`todo-list-filter-setting-ctrl ${style['module-style']}`} >
                <div
                    className={isActive ? 'is-active' : '' }
                    onClick={this.handleNavigate.bind(this)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(TodoListFilterSettingCtrl);
