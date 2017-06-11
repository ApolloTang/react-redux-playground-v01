if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: app/index.js'); // eslint-disable-line no-console
}

import React from 'react';
import { render } from 'react-dom';

import {nameSpace} from './config';
import FilteredTodos from './containers/filtered-todos';
import AddTodo from './containers/add-todo';
import Control from './components/control-section';

import style from './style';
const ModulesRoot = ({ match }) => {
    return (
        <div className={`${nameSpace} ${style['module-style']}`}>
            <div className="layout">
                <div className="filter-ctr-container">
                    <Control params={match.params}/>
                </div>
                <div className="add-todo-container">
                    <AddTodo />
                </div>
                <div className="todos-list-container">
                    <FilteredTodos filterType={match.params.filterType || 'all'}/>
                </div>
            </div>
        </div>
    );
};

export default ModulesRoot;
