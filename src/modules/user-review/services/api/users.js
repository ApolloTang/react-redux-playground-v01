import _ from 'lodash';
import store from 'root/store';
import {createHttp} from 'util/rest';
import c from '../../common/actions-names';
import {nameSpace, rootUrl} from '../../config';


const users = {
  getAll() {
    return createHttp
      .get(`${rootUrl}/users`)
      .then(
        users => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {users}
          });
          return users;
        }
      );
  },
  getOne(userId) {
    return createHttp
      .get(`${rootUrl}/users/${userId}`)
      .then(
        user => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {user}
          });
          return user;
        }
      );
  },
  create(payload) {
    return createHttp
      .post(`${rootUrl}/users`, payload)
      .then(
        newUser => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {newUser}
          });
          return newUser;
        }
      )
  },
  update(userId, payload) {
    return createHttp
      .put(`${rootUrl}/users/${userId}`, payload)
      .then(
        userEdited => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {userEdited}
          });
          return userEdited;
        }
      )
  },
  del(userId) {
    return createHttp
      .del(`${rootUrl}/users/${userId}`)
      .then(
        deletedUser => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_delete`],
            payload: {deletedUser: deletedUser}
          });
          return deletedUser;
        }
      )
  }

}


export default users;
