if (process && process.env && process.env.CONSOLE_LOG) {
    console.info('log from file: src/modules/module-a/index.js'); // eslint-disable-line no-console
}

import React, {Component} from 'react';

import {createHttp} from 'util/rest';

import style from './style';
class ModuleRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res : ''
    };
  }
  componentDidMount() {
    createHttp.get('http://localhost:3000/api/users').then(
      json => { this.setState({res: JSON.stringify(json, null, 2)}) }
    )
  }
  render() {
    console.log(this.state.res)
    return (
      <div className={`module-a ${style['module-style']}`} >
        <h2>  Rest </h2>
        <p><pre> {this.state.res} </pre></p>
      </div>
    );
  }
}

export default ModuleRoot;


