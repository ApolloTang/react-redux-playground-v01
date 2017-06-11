import _ from 'lodash';
import c from '../common/actions-names';
import {nameSpace} from '../config';


const todos = (state = {}, action) => {
    switch (action.type) {
        case `${nameSpace}__add`: {
            return {
                ...state,
                [action.id]: {
                    text: action.text,
                    id: action.id,
                    complete: false
                }
            }

        }
        case `${nameSpace}__remove`: {
            const nextState = {
                ...state
            }
            delete nextState[action.id];
            return nextState;
        }
        case `${nameSpace}__toggle`: {
            const nextState = {
                ...state
            }
            const prevComplete = state[action.id].complete;
            nextState[action.id].complete = !prevComplete;
            return nextState;
        }
      default:
          return state
    }
}

export default todos
