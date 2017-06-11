import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';

import userEditCreate from './reducer';
import {initialState} from './reducer';

describe(`
  +++++++++++++++++++++++++++++++++++++++++++++
  ++               Reducer Test              ++
  ++        user-edit-create container       ++
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
    //   expect( userEditCreate(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should simply return the state before', ()=>{
      expect( userEditCreate(stateBefore, action)).toBe(stateBefore);
    });
  });

  describe(':::: if the state before is undefined', () => {
    const stateBefore = void 0;
    const action = {
      type: 'ANY',
      payload: {}
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should return the initial state', ()=>{
      expect( userEditCreate(stateBefore, action)).toEqual(initialState);
    });
  });

  describe(':::: if router change route, reducer should maintain purity', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {}
    };
    const state_next = _.cloneDeep(state_prev);

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });

    test('it should not return an object of the same reference', ()=>{
      expect( userEditCreate(state_prev, action)).not.toBe(state_next);
    });
    test('it should not mutate previous state (value is preserved)', ()=>{
      expect( userEditCreate(state_prev, action) ).toEqual( state_next );
    });
  });

  describe(':::: c[`${nameSpace}__user_editOrCreate_draft_open`]', () => {
    const state_prev = {
      anything: 'anything'
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_open`],
      payload: {}
    };
    const state_next = {
      ...initialState,
      isOpen: true,
      isLoading: true
    }
    _.cloneDeep(state_prev);

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userView(stateBefore, action)).toBe({stateB4: stateBefore, initialState, act:action});
    // });
    test(`it should:
      - return all the properties of predefined initial state,
      - set isOpen to true,
      - set isLoading to true`, ()=>{
      expect( userEditCreate(state_prev, action)).not.toBe(state_next);
    });
  });

  describe(':::: c[`${nameSpace}__user_editOrCreate_draft_initDefault`] where draft_b4 === null', () => {
    const state_prev = {
      anything: 'anything',
      draft: null
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_initDefault`],
      payload: {
        draft:{
          data:'some data to initializied draft'
        }
      }
    };
    const state_next_expected = {
        ...state_prev,
      draft: _.cloneDeep(action.payload.draft.data),  // done mutate initial value in service
      isLoading: false,   // should done loading by now
      draftErrors: [],    // must be type array with length >= 0
      showErrors: false   // hide any error until user submit
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(state_prev, action)).toBe({stateB4: state_prev, initialState, act:action});
    // });

    test(`it should initialize with values of draft from payload b/c the draft was previously null)`, ()=>{
      expect( userEditCreate(state_prev, action).draft ).not.toEqual(state_next_expected.draft);
    });
    test(`initilized draft is a clone of draft in payload (no mutation)`, ()=>{
      expect( userEditCreate(state_prev, action).draft ).not.toBe(state_next_expected.draft);
    });
    test(`should have done loading by now`, ()=>{
      expect( userEditCreate(state_prev, action).isLoading ).toBe(false);
    });
    test(`should hide errors`, ()=>{
      expect( userEditCreate(state_prev, action).showErrors ).toBe(false);
    });
    test(`draftError should be an array`, ()=>{
      const expected_draftError = userEditCreate(state_prev, action).draftErrors;
      const isArray = _.isArray(expected_draftError);
      expect( isArray ).toBe(true);
      if (isArray) {
        test(`draftError should be an array of length zero or greater`, ()=>{
            expect( expected_draftError.length >= 0 ).toBe(true);
        });
      }
    });
    test(`draftError should be an array of length zero or greater`, ()=>{
      const expected_draftError = userEditCreate(state_prev, action).draftErrors;
      const isArray = _.isArray(expected_draftError);
      if (isArray) {
            expect( expected_draftError.length >= 0 ).toBe(true);
      }
    });
  });

  describe(':::: c[`${nameSpace}__user_editOrCreate_draft_initDefault`] where draft_B4 !== null', () => {
    const state_prev = {
      anything: 'anything',
      draft: {data: 'dart already initialized'}
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_initDefault`],
      payload: {
        draft:{
          data:'some data to initializied draft'
        }
      }
    };
    const state_next_expected = {
        ...state_prev,
      draft: state_prev.draft,  // draft is the same as previous
      isLoading: false,   // should done loading by now
      draftErrors: [],    // must be type array with length >= 0
      showErrors: false   // hide any error until user submit
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(state_prev, action)).toBe({stateB4: state_prev, initialState, act:action});
    // });

    test(`it should not initialize the draft because the draft has been populated and has the value of previouw draft`, ()=>{
      expect( userEditCreate(state_prev, action).draft ).toEqual(state_prev.draft);
    });
    test(`initilized draft is a clone of previous draft`, ()=>{
      expect( userEditCreate(state_prev, action).draft ).not.toBe(state_prev.draft);
    });
    test(`should have done loading by now`, ()=>{
      expect( userEditCreate(state_prev, action).isLoading ).toBe(false);
    });
    test(`should hide errors`, ()=>{
      expect( userEditCreate(state_prev, action).showErrors ).toBe(false);
    });
    test(`draftError should be an array`, ()=>{
      const expected_draftError = userEditCreate(state_prev, action).draftErrors;
      const isArray = _.isArray(expected_draftError);
      expect( isArray ).toBe(true);
      if (isArray) {
        test(`draftError should be an array of length zero or greater`, ()=>{
            expect( expected_draftError.length >= 0 ).toBe(true);
        });
      }
    });
    test(`draftError should be an array of length zero or greater`, ()=>{
      const expected_draftError = userEditCreate(state_prev, action).draftErrors;
      const isArray = _.isArray(expected_draftError);
      if (isArray) {
            expect( expected_draftError.length >= 0 ).toBe(true);
      }
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_initDefault_fail', () => {
    const state_prev = {
      anything: 'anything',
      draft: null
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_initDefault_fail`],
      payload: {
        httpError: 'http error',
        userId: 'can be undefined or an userId'
      }
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(state_prev, action)).toBe({stateB4: state_prev, initialState, act:action});
    // });

    test(`it should not initialize the draft`, ()=>{
      expect( userEditCreate(state_prev, action).draft ).toBeNull();
    });
    test(`should have done loading by now`, ()=>{
      expect( userEditCreate(state_prev, action).isLoading ).toBe(false);
    });
    test(`payload should contain httpError or error property or both`, ()=>{
      const state_next_expected = userEditCreate(state_prev, action);
      const hasError
        = state_next_expected.hasOwnProperty('httpError')
        || state_next_expected.hasOwnProperty('error');
      expect( hasError ).toBe(true);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_changed ', () => {
    const state_prev = {
      anything: 'anything',
      draft: { someField: 'value before'}
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_changed`],
      payload: {
        data: {someField: 'value after'}
      }
    };

    // test('DEV 000000000000000000 reducer out:', ()=>{
    //   expect( userEditCreate(state_prev, action)).toBe({stateB4: state_prev, initialState, act:action});
    // });

    test(`it should update draft`, ()=>{
      const draft_prev = state_prev.draft;
      const dataInPayload = action.payload.data;
      const draft_next_expected = {
        ...draft_prev,
        ...dataInPayload
      }
      expect( userEditCreate(state_prev, action).draft).toEqual(draft_next_expected);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_saveInitiated ', () => {
    const state_prev = {
      anything: 'anything',
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_saveInitiated`],
    };

    test(`set showError to true`, ()=>{
      expect( userEditCreate(state_prev, action).showErrors).toBe(true);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_submit_start ', () => {
    const state_prev = {
      anything: 'anything',
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_submit_start`],
    };

    test(`set showError to true`, ()=>{
      expect( userEditCreate(state_prev, action).isLoading).toBe(true);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_submit_success ', () => {
    const state_prev = {
      anything: 'anything',
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_submit_success`],
    };

    test(`set isLoading to false`, ()=>{
      expect( userEditCreate(state_prev, action).isLoading).toBe(false);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_submit_fail ', () => {
    const state_prev = {
      anything: 'anything',
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_submit_fail`],
      payload: {
        httpError: 'http error',
        userId: 'can be undefined or an userId'
      }
    };
    test(`payload should contain httpError or error property or both`, ()=>{
      const state_next_expected = userEditCreate(state_prev, action);
      const hasError
        = state_next_expected.hasOwnProperty('httpError')
        || state_next_expected.hasOwnProperty('error');
      expect( hasError ).toBe(true);
    });
  });

  describe(':::: ${nameSpace}__user_editOrCreate_draft_close ', () => {
    const state_prev = {
      anything: 'anything',
    };
    const action = {
      type: c[`${nameSpace}__user_editOrCreate_draft_close`],
    };
    test(`should clear draft by set it to initial state`, ()=>{
      expect( userEditCreate(state_prev, action) ).toEqual(initialState);
    });
  });
});
