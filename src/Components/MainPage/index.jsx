<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React from 'react';
import './styles.css';
>>>>>>> 0512486a1e72ce07c88637200df055136763469e
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import Login from '../Login';
import Register from '../Register';
import Profile from '../Profile';
import CreateCardForm from '../CreateCardForm';
import Card from '../Card';
import Payment from '../Payment';
import firebase from '../../firebase/firebase';
import { signIn } from '../../redux/actionCreators/authAction';

export default function MainPage() {
  const auth = false;
  if (!auth) {
    return (
      <div className="auth_false">
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
      </div>
    );
  }
  return (
    <div className="auth">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Card />
          </Route>
          <Route exact path="/yuorCard">
            yuorCard
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
    </div>
  );
}
