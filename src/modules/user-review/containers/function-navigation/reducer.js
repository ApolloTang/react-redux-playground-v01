import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';
import {combineReducers} from 'redux';

const initialState = {
}

const functionNavigation = (state = {...initialState}, action) => {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE` : {
      return {...state}
    }
    default: {
      return state
    }
  }
}

export default functionNavigation;
