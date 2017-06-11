import {combineReducers} from 'redux';

import userCatelog from './user-catelog';
import users from './users';

const resources = combineReducers( {
  userCatelog,
  users
});


export default resources;

