import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';


import {mapStoreToProps, mapDispatchToProps} from './selector';


const UserItem = ({ displayName, id, id_selectedUser }) => (
  <div className={(id===id_selectedUser) ? 'is-active' : ''} >
    <NavLink
      to={`/users/${id}`}
      activeClassName="is-active">{displayName}</NavLink>
  </div>
);

const UserList = ({userCatelog, id_selectedUser})=>{
  const ids = Object.keys(userCatelog);
  return (
    <div>
      { ids.map( id =>{
        const displayName = _.get(userCatelog, `${id}.name`, '');
        return(
          <UserItem
            key={id}
            id_selectedUser={id_selectedUser}
            id={id}
            displayName={displayName}
          />
        );
      }) }
    </div>
  );
}


import style from './style.less';
class UserCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.handle_getUserCatelog = this.handle_getUserCatelog.bind(this);
  }
  componentDidMount() {
    this.props.dispatch_init();
    this.handle_getUserCatelog();
  }
  handle_getUserCatelog() {
    this.props.dispatch_fetchUserCatelog();
  }
  render() {
    const userIdInParam = this.props.match.params.userId
    return (this.props.isLoading) ? (
      <div>
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </div>
    ):(
      <div
        className={`userCatelog ${style['module-style']}`} >
        <UserList
          id_selectedUser={userIdInParam}
          userCatelog={this.props.userCatelog}
        />
      </div>
    )
  }

};

export default connect(mapStoreToProps, mapDispatchToProps)(UserCatalog);

