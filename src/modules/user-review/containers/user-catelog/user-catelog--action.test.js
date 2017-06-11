import c from '../../common/actions-names';
import {nameSpace, api_urlAndPort} from '../../config';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import actions from './action'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe(`
  :::::::::::::::::::::::::::::::::::::::::::::
  ::            Aync Action Test             ::
  ::          user-catelog container         ::
  :::::::::::::::::::::::::::::::::::::::::::::
  `, () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it(`
    :::: user-caterlog/fetchUserCatelog()
      on evoke it should:
        - dispatch "__userCatelog_fetch_begin" action
      then it should:
        - dispatch "__userCatelog_fetch_success with a payload of user's ids
  `, () => {

    const userCatelog = [
      {
        "__v": 0,
        "_id": "5905fc6dc7bcb70a06f9397c",
        "name": "kkk"
      },
      {
        "__v": 0,
        "_id": "5905fcb5c7bcb70a06f9397e",
        "name": "ijku"
      }
    ];

    const ids_userCatelog = userCatelog.map( user=>user._id);

    nock(api_urlAndPort)
      .get('/api/userCatelog')
      .reply(200, userCatelog)


    const expectedActions = [
      {"type": c[`${nameSpace}__userCatelog_fetch_begin`]},
      {"type": c[`${nameSpace}__userCatelog_fetch_success`], "payload": { ids_userCatelog }   }
    ];

    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchUserCatelog())
      .then((arg) => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})



