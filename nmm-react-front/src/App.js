import React, { Component } from 'react';
import Button from './sharedPresentational/SharedButton';
import InputField from './sharedPresentational/SharedInputField';
import NavBar from './sharedPresentational/SharedNavBar';
import Picture from './sharedPresentational/SharedPicture';
import './App.css';

class App extends Component {
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
        <Picture source="https://australianmuseum.net.au/uploads/images/1955/barramundi%20cod%20477-6_medium.jpg" alt="this is a fish"/>
      </div>
    );
  }
}

export default App;
