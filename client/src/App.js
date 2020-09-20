import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Home from './component/layout/pages/Home';
import About from './component/layout/pages/About';
import Register from './component/auth/Register';
import Login from './component/auth/Login';

import PostState from './context/post/PostState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <AuthState>
      <PostState>
        <Router>
          <Fragment>
            <Navbar />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
              </Switch>
          </Fragment>
        </Router>
      </PostState>
    </AuthState>
  );
}

export default App;
