import React from 'react'
import TodoListFilterSettingCtrl from '../../containers/todo-list-filter-setting-ctrl'

const ControlSection = ({params}) => (
  <div>
    Show:
    <TodoListFilterSettingCtrl filterType="all" params={params} >
      All
    </TodoListFilterSettingCtrl>
    <TodoListFilterSettingCtrl filterType="active" params={params} >
      Active
    </TodoListFilterSettingCtrl>
    <TodoListFilterSettingCtrl filterType="completed" params={params} >
      Completed
    </TodoListFilterSettingCtrl>
  </div>
)

export default ControlSection;
