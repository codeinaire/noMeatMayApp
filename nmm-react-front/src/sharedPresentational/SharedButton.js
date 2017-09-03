import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button.attrs({
  fontSize: props => props.size || '1rem',
  margin: props => props.margin || `0em`,
})`
  border: 1px solid #e1a904;
  border-radius: .28571429rem;
  background-color: #fbbd08;
  min-height: 1em;
  margin: ${props => props.margin}em 0em;
  padding: .78571429em 1.5em .78571429em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  color: #fff;
  font-size: ${props => props.fontSize}rem;
  align-self: center;

  &:hover {
    background-color: #e1a904;
  }
`;

const SharedButton = (props) => (
  <Button size={props.size} margin={props.margin}>
    {props.title}
  </Button>
)

SharedButton.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
  margin: PropTypes.string,
}

export default SharedButton;
