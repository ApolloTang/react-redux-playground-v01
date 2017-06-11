import React from 'react';
import {UserEditCreate} from './index';
import {shallow } from 'enzyme';

const mockProps = {
  match: {
    path: 'this.props.match.path',
    params: {
      userId: '1234'
    }
  },
  dispatch_draftChanged : function(dataField){
    return dataField;
  }
};

describe(`
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@             Container Test              @@
  @@            user-edit-create             @@
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
`, () => {
  describe(':::: <UserEditCreate /> ', () => {
    const ez_comp = shallow(<UserEditCreate  {...mockProps} />);
    const ez_instance = ez_comp.instance()
    const ez_handle_fieldChange = ez_instance.handle_fieldChange;//('name');
    const result = ez_handle_fieldChange('name')('apollo');
    test(`:::: handle_fieldChange() can handle and field name and value in a dataField `, () =>{
      expect({'name':'apollo'}).toEqual(result);
    });

  })
});


