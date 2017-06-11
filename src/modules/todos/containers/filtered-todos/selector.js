import _ from 'lodash';
import  * as Action from '../../actions/todos';
import  {nameSpace} from  '../../config';


function getFilteredTodos(todos, filterType) {
    const todos_array = _(todos)
        .map(todo=>todo)
        .filter( todo=>{
            switch (filterType) {
                case 'all':
                    return true;
                    break;
                case 'completed':
                    return todo.complete
                    break;
                case 'active':
                    return !todo.complete
                    break;
            }
        }).value();
    return todos_array;
}

const mapStoreToProps = (store, ownProps) => {
    const unFilteredTodos =  _.get(store, `modules.${nameSpace}`, {});
    const filteredTodos = getFilteredTodos(unFilteredTodos, ownProps.filterType);
    return {
        todos: filteredTodos
    }
};

const mapDispatchToProps = (dispatch) => (
    {
        dispatch_complete(id) {
            dispatch( Action.toggleTodo(id) );
        },
        dispatch_remove(id) {
            dispatch( Action.removeTodo(id) );
        }
    }
);


export {mapStoreToProps, mapDispatchToProps};
