import {connect} from 'react-redux';

import {mapStoreToProps, mapDispatchToProps} from './selector';

import TodoList from '../../components/todos-view';

export default connect(mapStoreToProps, mapDispatchToProps)(TodoList);
