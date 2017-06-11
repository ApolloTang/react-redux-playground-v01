import c from '../../common/actions-names';
import {nameSpace, api_urlAndPort} from '../../config';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import actions from './action';
import nock from 'nock';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe(`
  :::::::::::::::::::::::::::::::::::::::::::::
  ::            Aync Action Test             ::
  ::      user-edit-create container         ::
  :::::::::::::::::::::::::::::::::::::::::::::
  `, () => {
    afterEach(() => { nock.cleanAll() })

    it(`
      :::: user-edit-create/action.draftInit(userId)
        on evoke it should:
          - dispatch "__user_editOrCreate_draft_open" action
        then it should:
          - dispatch "__user_editOrCreate_draft_initDefault" action and return the draft
    `, () => {
        const userId = '5905fc6dc7bcb70a06f9397c';
        const user = {
          "__v": 0,
          "_id": "5905fc6dc7bcb70a06f9397c",
          "name": "kkk"
        };
        nock(api_urlAndPort)
          .get('/api/users/5905fc6dc7bcb70a06f9397c')
          .reply(200, user)
        const expectedActions = [
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_open`]},
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_initDefault`], 'payload': {'draft': {'name': 'kkk'}, 'userId': user._id} }
        ];
        const store = mockStore({});
        return store.dispatch(actions.draftInit(userId))
          .then((arg) => {
            expect(store.getActions()).toEqual(expectedActions)
          })

    }); // End user-edit-create/action.draftInit(userId)

    it(`
      :::: user-edit-create/action.draftInit(undefined)
        on evoke it should:
          - dispatch "__user_editOrCreate_draft_open" action
        then it should:
          - dispatch "__user_editOrCreate_draft_initDefault" action and return the draft
    `, () => {
        const userId = void 0;

        const draft = {'name': ''};
        const expectedActions = [
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_open`]},
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_initDefault`], 'payload': {draft} }
        ];
        const store = mockStore({}, expectedActions);

        return store.dispatch(actions.draftInit(userId))
            .then((arg) => {
              expect(store.getActions()).toEqual(expectedActions)
            });
    }); // End user-edit-create/action.draftInit(undifined)

    it(`
      :::: user-edit-create/action.draftChanged(data)
        on evoke it should:
          - dispatch "__user_editOrCreate_draft_changed" action with payload of data
    `, () => {
        const userId = void 0;
        const data = {'name': 'xxxxx'};
        const expectedActions = [
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_changed`], 'payload': {data} }
        ];
        const store = mockStore({}, expectedActions);

        return store.dispatch(actions.draftChanged(data))
            .then((arg) => {
              expect(store.getActions()).toEqual(expectedActions)
            });
    }); // End user-edit-create/action.draftChanged(data)


    it(`
      :::: user-edit-create/action.draftSubmit(userId)
        on evoke it should:
          - dispatch "__user_editOrCreate_draft_saveInitiated" action with
            payload contain draft and userId
        then it should:
          - dispatch "__user_editOrCreate_draft_submit_start" action with
            payload contain draft and userId
        when draft is saved by mock server, it should:
          - dispatch "__user_editOrCreate_draft_submit_success" action with
            payload contain the updated userObject and same userId
        then it should:
          - dispatch "__userCatelog_fetch_begin" action
        finally it should:
          - dispatch "@@router/CALL_HISTORY_METHOD" action with payload of
            {'args': ['/users/userId'], 'method': 'push'}
      `, () => {
        const userId = '5905fc6dc7bcb70a06f9397c';
        const draft = {
          "name": "previous"
        };
        const receiveUser = {
          "__v": 0,
          "_id": "5905fc6dc7bcb70a06f9397c",
          "name": "newName"
        };
        nock(api_urlAndPort)
          .put('/api/users/5905fc6dc7bcb70a06f9397c', draft)
          .reply(200, receiveUser);
        const expectedActions = [
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_saveInitiated` ], 'payload': {'draft': {'name': 'previous'}, 'userId':userId} },
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_submit_start` ], 'payload': {'draft': {'name': 'previous'}, 'userId':userId} },
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_submit_success`], 'payload': {'user': receiveUser, 'userId':userId } },
          { 'type': c[`${nameSpace}__userCatelog_fetch_begin`]},
          { 'type': '@@router/CALL_HISTORY_METHOD', 'payload': {'args': [`/users/${userId}`], 'method': 'push'}   }
        ];
        const store = mockStore({
          modules: {
            userReview: {
              session: {
                userEditOrCreate: {
                  draft: draft,
                  draftErrors: []
                }
              }
            }
          }
        });
        return store.dispatch(actions.darftSubmit(userId))
          .then((arg) => {
              // console.log('0 Received: type : ', store.getActions()[0].type);
              // console.log('0 Expected: type : ', expectedActions[0].type);
              expect(store.getActions()[0].type).toBe(expectedActions[0].type)
              // console.log('0 Received: payload : ', store.getActions()[0].payload);
              // console.log('0 Expected: payload : ', expectedActions[0].payload);
              expect(store.getActions()[0].payload).toEqual(expectedActions[0].payload)
              // console.log('1 Received: type : ', store.getActions()[1].type);
              // console.log('1 Expected: type : ', expectedActions[1].type);
              expect(store.getActions()[1].type).toBe(expectedActions[1].type)
              // console.log('1 Received: payload : ', store.getActions()[1].payload);
              // console.log('1 Expected: payload : ', expectedActions[1].payload);
              expect(store.getActions()[1].payload).toEqual(expectedActions[1].payload)
              // console.log('2 Received: type : ', store.getActions()[2].type);
              // console.log('2 Expected: type : ', expectedActions[2].type);
              expect(store.getActions()[2].type).toBe(expectedActions[2].type)
              // console.log('2 Received: payload : ', store.getActions()[2].payload);
              // console.log('2 Expected: payload : ', expectedActions[2].payload);
              expect(store.getActions()[2].payload).toEqual(expectedActions[2].payload)
              // console.log('3 Received: type : ', store.getActions()[3].type);
              // console.log('3 Expected: type : ', expectedActions[3].type);
              expect(store.getActions()[3].type).toEqual(expectedActions[3].type)
              expect(store.getActions()[3]).toEqual(expectedActions[3])
              expect(store.getActions()[4]).toEqual(expectedActions[4])
          })

    }); // End user-edit-create/action.darftSubmit(userId)


    it(`
      :::: user-edit-create/action.draftSubmit(undefined)
        on evoke it should:
          - dispatch "__user_editOrCreate_draft_saveInitiated" action with
            payload contain draft and userId
        then it should:
          - dispatch "__user_editOrCreate_draft_submit_start" action with
            payload contain draft and userId
        when draft is saved by mock server, it should:
          - dispatch "__user_editOrCreate_draft_submit_success" action with
            payload contain the newly created userObject and new userId
        then it should:
          - dispatch "__userCatelog_fetch_begin" action
        finally it should:
          - dispatch "@@router/CALL_HISTORY_METHOD" action with payload of
            {'args': ['/users/newUserId'], 'method': 'push'}
      `, () => {
        const userId = void 0;
        const draft = {
          "name": "toBeCreated"
        };
        const createdUser = {
          "__v": 0,
          "_id": "5905fc6dc7bcb70a06f9397c",
          "name": "toBeCreated"
        };
        const id_created = createdUser._id;
        nock(api_urlAndPort)
          .post('/api/users', draft)
          .reply(200, createdUser);
        const expectedActions = [
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_saveInitiated` ], 'payload': {'draft': {'name': 'toBeCreated'}, 'userId':userId} },
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_submit_start` ], 'payload': {'draft': {'name': 'toBeCreated'}, 'userId':userId} },
          { 'type': c[`${nameSpace}__user_editOrCreate_draft_submit_success`], 'payload': {'user': createdUser, 'userId':id_created } },
          { 'type': c[`${nameSpace}__userCatelog_fetch_begin`]},
          { 'type': '@@router/CALL_HISTORY_METHOD', 'payload': {'args': [`/users/${id_created}`], 'method': 'push'}   }
        ];
        const store = mockStore({
          modules: {
            userReview: {
              session: {
                userEditOrCreate: {
                  draft: draft,
                  draftErrors: []
                }
              }
            }
          }
        });
        return store.dispatch(actions.darftSubmit(void 0))
          .then((arg) => {
              // console.log('0 Received: type : ', store.getActions()[0].type);
              // console.log('0 Expected: type : ', expectedActions[0].type);
              expect(store.getActions()[0].type).toBe(expectedActions[0].type)
              // console.log('0 Received: payload : ', store.getActions()[0].payload);
              // console.log('0 Expected: payload : ', expectedActions[0].payload);
              expect(store.getActions()[0].payload).toEqual(expectedActions[0].payload)
              // // console.log('1 Received: type : ', store.getActions()[1].type);
              // // console.log('1 Expected: type : ', expectedActions[1].type);
              expect(store.getActions()[1].type).toBe(expectedActions[1].type)
              // // console.log('1 Received: payload : ', store.getActions()[1].payload);
              // // console.log('1 Expected: payload : ', expectedActions[1].payload);
              expect(store.getActions()[1].payload).toEqual(expectedActions[1].payload)
              // // console.log('2 Received: type : ', store.getActions()[2].type);
              // // console.log('2 Expected: type : ', expectedActions[2].type);
              expect(store.getActions()[2].type).toBe(expectedActions[2].type)
              // // console.log('2 Received: payload : ', store.getActions()[2].payload);
              // // console.log('2 Expected: payload : ', expectedActions[2].payload);
              expect(store.getActions()[2].payload).toEqual(expectedActions[2].payload)
              // // console.log('3 Received: type : ', store.getActions()[3].type);
              // // console.log('3 Expected: type : ', expectedActions[3].type);
              expect(store.getActions()[3].type).toEqual(expectedActions[3].type)
              expect(store.getActions()[3]).toEqual(expectedActions[3])
              expect(store.getActions()[4]).toEqual(expectedActions[4])
          })

    }); // End user-edit-create/action.darftSubmit(userId)
    // don't for get create is reply with 201
  });
