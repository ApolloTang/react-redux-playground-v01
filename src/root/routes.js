import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import NotFound from 'components/not-found';

import FontTest from 'modules/font-test';
import LazyLoad from 'modules/lazy-load';
import Todos from 'modules/todos';
import Rest from 'modules/rest-testing';
import UserReview from 'modules/user-review';
import Playground from 'modules/playground';


const navigationDirective = [
    {to:'/', displayText:'Home'},
    {to:'/users', displayText:'User review'},
    {to:'/font-test', displayText:'Font test'},
    {to:'/lazy-load', displayText:'Lazy load'},
    {to:'/todos/all', displayText:'Todo'},
    {to:'/rest', displayText:'Rest'},
    {to:'/playground', displayText:'playground'}
];



const routes = (
  <Switch>
    <Route exact path="/" component={()=>(<div>home</div>)} />
    {/* <Route exact path="/" render={()=>( <Redirect to="/todos/all"/>)} /> */}
    {/* <Route exact path="/" render={()=>( <Redirect to="/users"/>)} /> */}
    <Route path="/users/:userId" component={UserReview} />
    <Route exact path="/users/new" component={UserReview} />
    <Route path="/users" component={UserReview} />
    <Route path="/font-test" component={FontTest} />
    <Route path="/lazy-load" component={LazyLoad} />
    <Route path="/todos/:filterType" component={Todos} />
    <Route path="/rest" component={Rest} />
    <Route path="/playground" component={Playground} />
    <Route component={NotFound}/>
  </Switch>
);

export {routes, navigationDirective};
