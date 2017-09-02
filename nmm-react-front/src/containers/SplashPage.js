import React, { Component } from 'react';
import Button from './sharedPresentational/SharedButton';
import NavBar from './sharedPresentational/SharedNavBar';
import Picture from './sharedPresentational/SharedPicture';

class SplashPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <NavBar />
        <Button
          title="I'm a button"
        />
        <InputField
          label="Test title"
          placeholder="test placeholder"
        />
        {/*
        <Picture /> */}
      </div>
    );
  }
}

export default SplashPage;
