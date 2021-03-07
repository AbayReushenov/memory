import React from 'react';
import './styles.css';
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
import AllCard from '../AllCard';
import Payment from '../Payment';
import YourCard from '../YourCard';
import FullCard from '../FullCard';

export default function MainPage() {
  const user = useSelector((state) => state.user);
  if (!user.uid) {
    return (
      <div className="auth_false auth_false_animated">
        <h1 className="auth_false__main_title">
          Помни тех кто ушел, <br /> Вспомни о тех кто был...
        </h1>
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
            <AllCard />
          </Route>
          <Route exact path="/yuorCard">
            <YourCard />
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
          <Route exact path="/card/:id">
            <FullCard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
