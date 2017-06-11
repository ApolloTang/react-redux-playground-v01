import React from 'react';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import LandingPage from './components/landing-page';
import NotFound from 'components/not-found';
import UserView from './containers/user-view';
import UserEditCreate from './containers/user-edit-create';


const GiveReview = (props)=>{
  console.log('GiveReview: ', props)
  const userId = props.match.params.userId;
  return (
    <div>
      <NavLink to={`/users/${userId}/give-review/4`} activeClassName="is-active">user 4</NavLink>
      <NavLink to={`/users/${userId}/give-review/5`} activeClassName="is-active">user 5</NavLink>
      <NavLink to={`/users/${userId}/give-review/6`} activeClassName="is-active">user 6</NavLink>
      <div>User {props.match.params.userId} view {props.match.params.targetId}</div>
    </div>
  )
}

const viewReview = (props)=>{
  console.log('viewReview: ', props)
  const userId = props.match.params.userId;
  return (
    <div>
      <NavLink to={`/users/${userId}/view-review/4`} activeClassName="is-active">user 4</NavLink>
      <NavLink to={`/users/${userId}/view-review/5`} activeClassName="is-active">user 5</NavLink>
      <NavLink to={`/users/${userId}/view-review/6`} activeClassName="is-active">user 6</NavLink>
      <div>User {props.match.params.userId} review {props.match.params.targetId}</div>
    </div>
  )
}

const routes = (
  <Switch>
    <Route exact path="/users"                component={(props)=><LandingPage    {...props}/>} />
    <Route exact path="/users/new"            component={(props)=><UserEditCreate {...props}/>} />
    <Route exact path="/users/:userId/edit"   component={(props)=><UserEditCreate {...props}/>} />
    <Route exact path="/users/:userId"        component={(props)=><UserView {...props}/>} />
    <Route exact path="/users/:userId/view-review/:targetId" component={viewReview} />
    <Route exact path="/users/:userId/view-review/" component={viewReview} />
    <Route exact path="/users/:userId/give-review/:targetId" component={GiveReview} />
    <Route exact path="/users/:userId/give-review/" component={GiveReview} />
    <Route component={NotFound}/>
  </Switch>
);

export default routes;
