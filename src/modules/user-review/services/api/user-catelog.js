import _ from 'lodash';
import store from 'root/store';
import {createHttp} from 'util/rest';
import c from '../../common/actions-names';
import {nameSpace, rootUrl} from '../../config';


const userCatelog = {
  getAll() {
    return createHttp
      .get(`${rootUrl}/userCatelog`)
      .then(
        userCatelog => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_userCatelog_update`],
            payload: {userCatelog}
          });
          return userCatelog;
        }
      );
  }
}


export default userCatelog;
