import React from 'react';
import NotFound from './index';
import testRenderer from 'react-test-renderer';

describe(`
  *********************************************
  **             Component Test              **
  **                not-found                **
  *********************************************
  `, () => {
    test(`:::: snapshot test `, () =>{
      const component = testRenderer.create(<NotFound />);
      const componentJson = component.toJSON();
      expect(componentJson).toMatchSnapshot();
    });
});




