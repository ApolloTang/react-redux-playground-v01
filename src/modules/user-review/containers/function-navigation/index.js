import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';


import {mapStoreToProps, mapDispatchToProps} from './selector';

import SimpleNavigation from 'widgets/simple-navigation';

import style from  './style';
class FunctionNavigation extends React.Component {

  render() {
    const id_selectedUser = this.props.match.params.userId

    let navigationDirective = [
      {to:'/users/new', displayText:'Add User'},
      {to:`/users/${id_selectedUser}/edit`, displayText:'Edit User'},
      {to:`/users/${id_selectedUser}/assign`, displayText:'Assign Review'},
      {to:`/users/${id_selectedUser}/give-review`, displayText:'Give Review'},
      {to:`/users/${id_selectedUser}/view-review`, displayText:'View Review'},
    ];

    const url = this.props.match.url;
    const isCreate = /^\/users\/new\/?$/i.test(url);
    const noUser = /^\/users\/?$/i.test(url);

    if (isCreate || noUser) {
      navigationDirective = [
        {to:'/users/new', displayText:'Add User'},
      ];
    }
    return(
      <div className={`function-navigation ${style['module-style']}`}>
        <SimpleNavigation navigations={navigationDirective}/>
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(FunctionNavigation);
