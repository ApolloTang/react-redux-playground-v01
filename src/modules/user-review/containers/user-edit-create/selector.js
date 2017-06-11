import _ from 'lodash';
import Action from './action';
import {nameSpace} from '../../config';

const mapStoreToProps = store=>{
  const isLoading = _.get(store, `modules.${nameSpace}.session.userEditOrCreate.isLoading`, true);
  const httpError = _.get(store, `modules.${nameSpace}.session.userEditOrCreate.httpError`, void 0);
  const draft = _.get(store, `modules.${nameSpace}.session.userEditOrCreate.draft`, void 0);
  return {
    isLoading,
    httpError,
    draft
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch_draftInit(userId) { dispatch(Action.draftInit(userId) ) },
  dispatch_draftChanged(data) { dispatch(Action.draftChanged(data) ) },
  dispatch_draftSubmit(userId) { dispatch(Action.darftSubmit(userId) ) },
  dispatch_draftCancel(userId) { dispatch(Action.draftTearDown(userId) ) }
});


export {mapStoreToProps, mapDispatchToProps};
