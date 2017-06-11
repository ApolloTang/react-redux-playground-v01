import c from '../common/actions-names';
import {nameSpace} from '../config';

let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: `${nameSpace}__add`,
    id: nextTodoId++,
    text
  }
}

export const removeTodo = (id) => {
  return {
    type: `${nameSpace}__remove`,
    id
  }
}

export const toggleTodo = (id) => {
  return {
    type: `${nameSpace}__toggle`,
    id
  }
}
