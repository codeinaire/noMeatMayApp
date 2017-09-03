import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SplashPage from './containers/SplashPage.js';
import SignUpPage from './containers/SignUpPage.js';

class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={SplashPage}/>
          <Route path="/signup" component={SignUpPage} />
        </div>
      </Router>
    );
  }
}

export default App;
