import _ from 'lodash';

import c from '../../common/actions-names';
import {nameSpace} from '../../config';
import store from 'root/store';
import createHttp from 'util/http';

const rootURL = `localhost:3000`;

const userCatelog = {
  getAll: ()=>{
    return createHttp()
      .get(`${rootURL}/users`)
      .then(
        users => { store.dispatch( {
            type: `${nameSpace}__resources_userCatelog_update`,
            payload: {users}
          });
          return users;
        }
      );
  }
};

const API = {
  userCatelog,
};

export default API;

