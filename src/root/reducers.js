import {combineReducers} from 'redux';

import todos from  'modules/todos/reducers';
import userReview from  'modules/user-review/reducers';

const modules = combineReducers({
  todos,
  userReview
});

const rootReducer = combineReducers({
  modules,
  // resources: AppReducer,
  // sessions: {}
})

export default rootReducer;
