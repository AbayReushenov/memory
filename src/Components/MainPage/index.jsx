import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation';
import Login from '../Login';
import Register from '../Register';
import Profile from '../Profile';
import CreateCardForm from '../CreateCardForm';
import Card from '../Card';
import Payment from '../Payment';

export default function MainPage() {
  const auth = useSelector((state) => state.auth);
  if (!auth.uid) {
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
          <Card />
        </Route>
        <Route exact path="/yourPayment">
          <Payment />
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
