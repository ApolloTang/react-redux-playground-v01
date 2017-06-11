import {nameSpace} from  '../config';

import userCatlog from '../containers/user-catelog/action-names';
import userView from '../containers/user-view/action-names';
import userEditOrCreate from '../containers/user-edit-create/action-names';

/* move the following const to reducers/resources? */
const resources = [
  'resources_userCatelog_update',
  'resources_users_update',
  'resources_users_delete',
];

const symbols = [
  ...resources,
  ...userCatlog,
  ...userView,
  ...userEditOrCreate
].reduce((acc, eventName) => ({
  ...acc,
  [`${nameSpace}__${eventName}`]: acc[eventName] ? duplicateEventNameError(eventName) : Symbol.for(`${nameSpace}__${eventName}`)
}), {});

function duplicateEventNameError (eventName) {
  throw new Error(`Event ${eventName} already exists`);
}

export default symbols;

