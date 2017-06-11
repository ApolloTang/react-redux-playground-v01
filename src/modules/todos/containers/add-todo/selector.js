import {addTodo as Action_addTodo } from '../../actions/todos';

const mapStoreToProps = store=>({});

const mapDispatchToProps = dispatch => ({
    dispatch_addTodo(text) { dispatch( Action_addTodo(text) ); }
});


export {mapStoreToProps, mapDispatchToProps};
