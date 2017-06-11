import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';

import API from '../../services/api';

import { push } from 'connected-react-router'
import Action_userCatelog from  '../user-catelog/action'


const user_EditOrCreate = {
  draftInit (_userId) {
    return (dispatch, getState) => {
      dispatch({
        type: c[`${nameSpace}__user_editOrCreate_draft_open`]
      });

      const userId = _userId;

      // const draft_default = {...(_.cloneDeep(services.draftDefaultValues)) }; // @TODO
      const draft_default = {
        ...( _.cloneDeep({
          name: ''
        }))
      };

      if (userId) {
        return API.users.getOne(userId).then(
          user => {
            if ( user.hasOwnProperty('httpError')) {
              const httpError = user.httpError;
              dispatch({
                type: c[`${nameSpace}__user_editOrCreate_draft_initDefault_fail`],
                payload: {httpError, userId}
              });
              return {httpError};
            }

            // -- prepare initial draft for edit -- //
            const user_picked = _.pick(user, Object.keys(draft_default)); // only pick the field that required

            const draft = {
              ...draft_default,  // <-- merge with the initial value in case there are field missing from API
              ...user_picked
            };
            dispatch({
              type: c[`${nameSpace}__user_editOrCreate_draft_initDefault`],
              payload: { draft, userId }
            });
          },
          err => {
            dispatch({
              type: c[`${nameSpace}__user_editOrCreate_draft_initDefault_fail`],
              error: err
            });
          }
        )
      } else if (!userId) {
        // -- prepare initial draft for create -- //
        const draft = { ...draft_default };

        return Promise.resolve().then(
          ()=>{
            dispatch({
              type: c[`${nameSpace}__user_editOrCreate_draft_initDefault`],
              payload: { userId, draft }
            });
          }
        );
      }
    }
  },
  draftChanged (data) {
    return (dispatch, getState) => Promise.resolve().then(
      ()=>{
        dispatch({
          type: c[`${nameSpace}__user_editOrCreate_draft_changed`],
          payload: { data }
        });
      }
  )},
  darftSubmit(_userId) {
    const userId = _userId;

    return (dispatch, getState) => {
      const draft = _.get(getState(), `modules.${nameSpace}.session.userEditOrCreate.draft`, void 0);

      dispatch({
        type: c[`${nameSpace}__user_editOrCreate_draft_saveInitiated`],
        payload: { userId, draft }
      });

      const draftErrors = _.get(getState(), `modules.${nameSpace}.session.userEditOrCreate.draftErrors`, null);
      if (draftErrors.length !== 0) {
        // Cannot send because there are erorrs in form
        return;
      }

      // @TODO serialized for api not impliment
      // const meta = {};
      // const  = _.cloneDeep( services.serializedForApi(draft, meta) );

      dispatch({
        type: c[`${nameSpace}__user_editOrCreate_draft_submit_start`],
        payload: { userId, draft }
      });

      if (userId) {
        return API.users.update(userId, draft).then(
          userEdited => {
            if ( userEdited.hasOwnProperty('httpError')) {
              const httpError = user.httpError;
              dispatch({
                type: c[`${nameSpace}__user_editOrCreate_draft_submit_fail`],
                payload: {httpError, userId}
              });
              return {httpError};
            } else {
              dispatch({
                type: c[`${nameSpace}__user_editOrCreate_draft_submit_success`],
                payload: { userId, user:userEdited }
              });

              // 1) add this user to resource/user
                 // @TODO
              // 2) update user catelog so it has this user
                dispatch(Action_userCatelog.fetchUserCatelog() )
              // 2) Navigate to view new user
                dispatch( push(`/users/${userId}`));
              // 4) Close Draft
                dispatch({
                    type: c[`${nameSpace}__user_editOrCreate_draft_close`],
                    payload: {}
                });
            }
          }
        ).catch( err => {
          dispatch({
            type: c[`${nameSpace}__user_editOrCreate_draft_submit_fail`],
            error: err
          });
        });
      } else if (!userId) {
        return API.users.create(draft).then(
          newUser => {
            if ( newUser.hasOwnProperty('httpError')) {
              const httpError = user.httpError;
              dispatch({
                type: c[`${nameSpace}__user_editOrCreate_draft_submit_fail`],
                payload: {httpError, userId}
              });
              return {httpError};
            } else {
              const userId_new = _.get(newUser, `_id`, '[Error] missing user Id');
              dispatch({
                type: c[`${nameSpace}__user_editOrCreate_draft_submit_success`],
                payload: { userId: userId_new, user:newUser }
              });

              const newId = newUser._id;

              // 1) add this user to resource/user
                 // @TODO
              // 2) update user catelog so it has this user
                dispatch(Action_userCatelog.fetchUserCatelog() )
              // 2) Navigate to view new user
                dispatch( push(`/users/${newId}`));
              // 4) Close Draft
                dispatch({
                    type: c[`${nameSpace}__user_editOrCreate_draft_close`],
                    payload: {}
                });
            }
          }
        ).catch( err => {
          dispatch({
            type: c[`${nameSpace}__user_editOrCreate_draft_submit_fail`],
            error: err
          });
        });
      }
    };
  },
  draftTearDown(userId) {
    return (dispatch, getState) => {
      dispatch({
        type: c[`${nameSpace}__user_editOrCreate_draft_close`],
        payload: {}
      });
      if (userId) {
        dispatch( push(`/users/${userId}`));
      } else if (!userId) {
        dispatch( push(`/users`));
      }
    };
  }
}

export default user_EditOrCreate;


