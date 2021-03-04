import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navigation from '../Navigation';
import Login from '../Login';
import Register from '../Register';
import Profile from '../Profile';
import CreateCardForm from '../CreateCardForm';
import AllCard from '../AllCard';
import Payment from '../Payment';
import YourCard from '../YourCard';

export default function MainPage() {
  const auth = true;
  if (!auth) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <AllCard />
        </Route>
        <Route exact path="/yourPayment">
          <Payment />
        </Route>
        <Route exact path="/yourCard">
          <YourCard />
        </Route>   
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/createCard">
          <CreateCardForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
