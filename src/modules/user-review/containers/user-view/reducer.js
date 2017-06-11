import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';
import {combineReducers} from 'redux';

const initialState = {
  isLoading: false,
  httpError: null
}

const userView = (state = {...initialState}, action) => {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE` : {
      return {...state}
    }
    case c[`${nameSpace}__userView_init`]: {
      return { ...state }
      }
    case c[`${nameSpace}__userView_fetch_begin`]: {
      const state_prev = {...state};
      const state_next = {
        ...state,
        httpError: null,
        isLoading: true
      };
      return state_next;
    }
    case c[`${nameSpace}__userView_fetch_success`]: {
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false
      };
      return state_next;
    }
    case c[`${nameSpace}__userView_fetch_fail`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false,
        httpError: payload.httpError
      };
      return state_next;
    }
    default: {
      return state;
    }
  }
}

export default userView;
export {initialState};
