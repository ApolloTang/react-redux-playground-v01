import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';

import userView from './reducer';
import {initialState} from './reducer';

describe(`
  +++++++++++++++++++++++++++++++++++++++++++++
  ++               Reducer Test              ++
  ++           user-view container           ++
  +++++++++++++++++++++++++++++++++++++++++++++
`, () => {

  describe(':::: for action of type UNKNOWN', () => {
    const stateBefore = {
      anything: 'anything'
    };
    const action = {
      type: 'UNKNOWN',
      payload: {}
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should simply return the state before', ()=>{
      expect( userView(stateBefore, action)).toBe(stateBefore);
    });
  });

  describe(':::: if the state before is undefined', () => {
    const stateBefore = void 0;
    const action = {
      type: 'ANY',
      payload: {}
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should return the initial state', ()=>{
      expect( userView(stateBefore, action)).toEqual(initialState);
    });
  });

  describe(':::: if router change route, reducer should maintain purity', () => {
    const stateBefore = {
      anything: 'anything'
    };
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {}
    };
    const stateAfter = _.cloneDeep(stateBefore);

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should not return an object of the same reference', ()=>{
      expect( userView(stateBefore, action)).not.toBe(stateAfter);
    });

    test('it should not mutate previous state (value is preserved)', ()=>{
      expect( userView(stateBefore, action) ).toEqual( stateAfter );
    });
  });

  describe(':::: c[`${nameSpace}__userView_init`], reducer should maintain purity', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: c[`${nameSpace}__userView_init`],
      payload: {}
    };
    const state_next = _.cloneDeep(state_prev);

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should not return an object of the same reference', ()=>{
      expect( userView(state_prev, action)).not.toBe(state_next);
    });

    test('it should not mutate previous state (value is preserved)', ()=>{
      expect( userView(state_prev, action) ).toEqual( state_next );
    });
  });

  describe(':::: c[`${nameSpace}__userView_fetch_begin`]', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: c[`${nameSpace}__userView_fetch_begin`],
      payload: {}
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(state_prev, action)).toBe({state_next, action});
    // });

    test('isLoading should be set to true', ()=>{
      expect( userView(state_prev, action).isLoading).toBe(true);
    });
    test('isLoading should be set to true', ()=>{
      expect( userView(state_prev, action).httpError).toBeNull();
    });
  });

  describe(':::: c[`${nameSpace}__userView_fetch_success`]', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: c[`${nameSpace}__userView_fetch_success`],
      payload: {}
    };
    const state_next = {
      ...state_prev,
      isLoading: false
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(state_prev, action)).toBe({state_next, action});
    // });

    test('isLoading should be set to false', ()=>{
      expect( userView(state_prev, action)).toEqual(state_next);
    });
  });


  describe(':::: c[`${nameSpace}__userView_fetch_fail`]', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: c[`${nameSpace}__userView_fetch_fail`],
      payload: {httpError: 'some error'}
    };
    const state_next = {
      ...state_prev,
      isLoading: false,
      httpError: action.payload.httpError
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(state_prev, action)).toBe({state_next, action});
    // });

    test('isLoading should be set to false, and httpError from payload is present in state', ()=>{
      expect( userView(state_prev, action)).toEqual(state_next);
    });
  });
});
