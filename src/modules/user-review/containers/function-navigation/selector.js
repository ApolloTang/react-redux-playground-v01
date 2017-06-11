import _ from 'lodash';
import Action from './action';
import {nameSpace} from '../../config';

const mapStoreToProps = (store, ownProps)=>{
  return {
    ownProps,
  }
};

const mapDispatchToProps = dispatch => ({
  dispatch_someAction() { dispatch( Action_someAction() ); }
});


export {mapStoreToProps, mapDispatchToProps};
