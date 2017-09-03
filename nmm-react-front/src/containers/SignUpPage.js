import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import Picture from '../sharedPresentational/SharedPicture';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';

class SignUpPage extends Component {
  render() {
    return (
      <StyledFlex >
        <NavBar />
        <TextBox
          size="3"
          text="No Meat May"
        />
        <TextBox
          size="2"
          text="Change your diet, change the world. Sign-up now!"
          backgroundColour="#fbbd08"
          textColour="#fff"
        />
        <InputField
          label="Username"
          placeholder="Time to name the new you!"
        />
        <InputField
          label="Email"
          placeholder="Some way to contact you."
        />
        <InputField
          label="Password"
          placeholder="Just for you. We won't tell anyone, promise."
        />
        <Link to="/signin">
          <Button
            title="Let's Get Started"
            size="3"
            margin="1"
          />
        </Link>
      </StyledFlex >
    );
  }
}

export default SignUpPage;
