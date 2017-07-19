import React, { Component } from 'react';
import lab from './lab';

import style from './style';
class ModuleRoot extends Component {
  constructor(props) {
    super(props);
    lab();
  }
  render() {
    return (
    <div className = { `module-a ${style['module-style']}` } >
      <p>playground</p>
    </div>
    );
  }
}

export default ModuleRoot;
