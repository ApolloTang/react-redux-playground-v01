import React from 'react';

import TodoItem from './todo-item';
import style from './style';

const TodoList = (props) => {
    return (
        <div className={`todo-list ${style['module-style']}`}>
            {/*
            <div className="todo-item"><span className="todo-item-text" >dsfasdf</span><span className="todo-item-delete">x</span></div>
            <div className="todo-item"><span className="todo-item-text" >dsfasdf</span><span className="todo-item-delete">x</span></div>
            <div className="todo-item"><span className="todo-item-text" >dsfasdf</span><span className="todo-item-delete">x</span></div>
            <div className="todo-item"><span className="todo-item-text" >dsfasdf</span><span className="todo-item-delete">x</span></div>
                */}
            {
                props.todos.map((todo, i)=>{
                    return (
                        <TodoItem
                            key={i}
                            id={todo.id}
                            text={todo.text}
                            complete={todo.complete}
                            handleRemove={()=>{props.dispatch_remove(todo.id)}}
                            handleComplete={()=>{props.dispatch_complete(todo.id)}}
                        />);
                })
            }
        </div>
    );
}


export default  TodoList;

