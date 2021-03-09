import React, { useState } from 'react';
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
import AwaitInvaitCard from '../AwaitInvaitCard';
import InWorkYourCard from '../InWorkYourCard'
import FullCard from '../FullCard';
import Performers from '../Performers';
import About from '../About';
import ProjectInfo from '../ProjectInfo';

export default function MainPage() {
  const user = useSelector((state) => state.user);
  const [viewLoginForm, setviewLoginForm] = useState(false);
  const [viewRegisterForm, setviewRegisterForm] = useState(false);

  if (!user.uid) {
    return (
      <div className="auth_false auth_false_animated">
        <Router>
          <Navigation
            setviewLoginForm={setviewLoginForm}
            setviewRegisterForm={setviewRegisterForm}
          />
          {viewRegisterForm && (
            <Register setviewRegisterForm={setviewRegisterForm} />
          )}
          {viewLoginForm && <Login setviewLoginForm={setviewLoginForm} />}
          <Switch>
            <Route exact path="/">
              <ProjectInfo />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/performers">
              <Performers />
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
          <Route exact path="/waitInviteList">
            <AwaitInvaitCard />
          </Route>
          <Route exact path="/workList">
            <InWorkYourCard />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/createCard">
            <CreateCardForm />
          </Route>
          <Route exact path="/card/:uid">
            <FullCard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
