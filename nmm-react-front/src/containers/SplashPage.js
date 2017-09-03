import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import Picture from '../sharedPresentational/SharedPicture';
import TextBox from '../sharedPresentational/SharedTextBox';
import styled from 'styled-components';

export const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

class SplashPage extends Component {
  render() {
    return (
      <StyledFlex >
        <NavBar />
        <TextBox size="3" text="No Meat May"/>
        <div>
          <Picture
            source="https://australianmuseum.net.au/uploads/images/1955/barramundi%20cod%20477-6_medium.jpg"
            alt="this is a fish"
            height="250px"
            width="250px"
          />
          <Picture
            source="https://australianmuseum.net.au/uploads/images/1955/barramundi%20cod%20477-6_medium.jpg"
            alt="this is a fish"
            height="250px"
            width="250px"
          />
          <Picture
            source="https://australianmuseum.net.au/uploads/images/1955/barramundi%20cod%20477-6_medium.jpg"
            alt="this is a fish"
            height="250px"
            width="250px"
          />
          <Picture
            source="https://australianmuseum.net.au/uploads/images/1955/barramundi%20cod%20477-6_medium.jpg"
            alt="this is a fish"
            height="250px"
            width="250px"
          />
        </div>
        <Link to="/signup">
          <Button
            title="Sign Up For The Challenge"
            size="3"
            margin="1"
          />
        </Link>
      </StyledFlex >
    );
  }
}

export default SplashPage;
