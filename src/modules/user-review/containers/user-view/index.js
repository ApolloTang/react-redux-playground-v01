import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';


import {mapStoreToProps, mapDispatchToProps} from './selector';


import style from './style.less';
class UserView extends React.Component {
  constructor(props) {
    super(props);

    this.handle_deleteUser = this.handle_deleteUser.bind(this);

    this._checkId = this._checkId.bind(this);
    this._getUser = this._getUser.bind(this);

    this._cache = {
      isValid_userId : false,
      userId: void 0
    };
  }
  componentDidMount() {
    this.props.dispatch_init();
    const userId = this.props.match.params.userId
    this._getUser(userId);
  }
  componentWillReceiveProps(nextProps) {
    const userId_prev = this.props.match.params.userId
    const userId_next = nextProps.match.params.userId;
    if (userId_prev !== userId_next) {
      // route has changed need to get user
      this._getUser(userId_next);
    }
  }
  handle_deleteUser(userId) {
    if (this._checkId(userId)) {
      this.props.dispatch_deleteUser(userId)
    }
  }
  _getUser(userId) {
    if (this._checkId(userId)) {
      this.props.dispatch_fetchUser(userId);
    }
  }
  _checkId(userId){
    this._cache.userId = userId;
    const isNew = /^new$/i.test(userId);
    // const isValidFormat = userId.match(/^[0-9a-fA-F]{24}$/)

    if (userId && !isNew ) {
      this._cache.isValid_userId = true;
      return true;
    } else {
      this._cache.isValid_userId = false;
      return false;
    }
  }
  render() {
    if (this.props.isLoading) {
      return(
        <div className={`userView ${style['module-style']}`} >
          <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
      )
    }

    if (!this._cache.isValid_userId) {
      return(
        <div className={`userView ${style['module-style']}`} >
          Invalid userId
        </div>
      )
    }

    const httpError  = _.get(this.props, `httpError`, void 0);
    const httpError_status  = _.get(this.props, `httpError.status`, void 0);

    if (httpError_status === 404) {
      return(
        <div className={`userView ${style['module-style']}`} >
          <div>
            <div> This use does not exist, please select another user.  </div>
            <div> Error: [404] Resourse not found</div>
          </div>
        </div>
      );
    } else if (httpError) {
      return(
        <div className={`userView ${style['module-style']}`} >
          <div>
            <div>An Error has occured</div>
            <div>{`Error: ${ JSON.stringify(httpError, null, 4) }`}</div>
          </div>
        </div>
      );
    }

    if (!httpError) {
      const name = _.get(this.props.users, `${this._cache.userId}.name`, void 0);
      return (
        <div className={`userView ${style['module-style']}`} >
          <div>
            <div>{`id: ${this._cache.userId}`}</div>
            <div>{`Name: ${name}`}</div>
            <div>
              <button onClick={()=>{ this.handle_deleteUser(this._cache.userId) }}>delete this user</button>
            </div>
          </div>
        </div>
      )
    }
  }

};

export default connect(mapStoreToProps, mapDispatchToProps)(UserView);

