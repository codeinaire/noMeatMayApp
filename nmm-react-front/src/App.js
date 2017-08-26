import React, { Component } from 'react';
import Button from './sharedDumbComponents/SharedButton';
import InputField from './sharedDumbComponents/SharedInputField';
import NavBar from './sharedDumbComponents/SharedNavBar';
import Picture from './sharedDumbComponents/SharedPicture';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <Button
          title="look at me"
        />
        {/* <InputField />
        <NavBar />
        <Picture /> */}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
