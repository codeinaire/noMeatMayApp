import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid #e1a904;
  border-radius: .28571429rem;
  min-height: 1em;
  color: #fff;
  background-color: #fbbd08;
  font-size: 1rem;
  padding: .78571429em 1.5em .78571429em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;

  &:hover {
    background-color: #e1a904;
  }
`;

const SharedButton = (props) => (
  <div>
    <Button>
      {props.title}
    </Button>
  </div>
)

SharedButton.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SharedButton;
