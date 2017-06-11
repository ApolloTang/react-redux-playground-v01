import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Link, Redirect, NavLink} from 'react-router-dom';

import ReduxInput from 'widgets/redux-input';
import FormField from 'widgets/form-field';

import {mapStoreToProps, mapDispatchToProps} from './selector';

import style from './style.less';
class UserEditCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handle_save = this.handle_save.bind(this);
    this.handle_cancel = this.handle_cancel.bind(this);
    this.handle_fieldChange = this.handle_fieldChange.bind(this);

    this._checkUserId = this._checkUserId.bind(this);
    this._getUserId = this._getUserId.bind(this);
  }
  componentDidMount() {
    this.props.dispatch_draftInit(this._getUserId());
  }
  handle_save() {
    this.props.dispatch_draftSubmit(this._getUserId());
  }
  handle_cancel() {
    this.props.dispatch_draftCancel(this._getUserId());
  }
  handle_fieldChange (fieldName) {
    return fieldValue => {
      const newFormData = {
        [fieldName]: fieldValue
      };
      return this.props.dispatch_draftChanged(newFormData);
    };
  }
  _checkUserId(){
    const userIdInParams = this.props.match.params.userId;
    if (!userIdInParams) {
      return false;
    }

    const isValidFormat = userIdInParams.match(/^[0-9a-fA-F]{24}$/)
    const isNew = (this.props.match.path === '/users/new');
    return (isValidFormat || isNew);
  }
  _getUserId(){
    const isNew = (this.props.match.path === '/users/new');
    const userIdInParams =this.props.match.params.userId;
    const userId = isNew ? void 0 : userIdInParams;
    return userId;  // return void 0 if creating a new user
  }
  render() {
    if (this.props.isLoading) {
      return(
        <div className={`userView ${style['module-style']}`} >
          <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
        </div>
      );
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
      const userId =  this._getUserId();
      const _name = _.get(this.props, `draft.name`, void 0)
      const name = _name ? _name : '';
      return (
        <div className={`userView ${style['module-style']}`} >
          <div>
            <div>{userId ? `Edit ${userId}` : 'Create'}</div>
            <FormField
              label="Name"
              errors={[]}
              showErrors={false}
              isRequired={false} >
              <ReduxInput
                value={name}
                onChange={this.handle_fieldChange('name')} />
            </FormField>
            <button onClick={this.handle_save}>Save</button>
            <button onClick={this.handle_cancel}>cancel</button>
          </div>
        </div>
      );
    }
  }

};

export default connect(mapStoreToProps, mapDispatchToProps)(UserEditCreate);
export {UserEditCreate}

