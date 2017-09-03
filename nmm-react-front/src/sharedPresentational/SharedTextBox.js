import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledText = styled.h2.attrs({
  fontSize: props => props.size || '1rem',
  backgroundColour: props => props.backgroundColour || '#646fe2',
  textColour: props => props.textColour || '#000',
})`
  border: 1px solid;
  border-radius: .28571429rem;
  padding: .78571429em 1.5em .78571429em;
  margin: 1em 0em;
  align-self: center;
  background-color: ${props => props.backgroundColour};
  color: ${props => props.textColour};
  text-align: center;
  min-height: 1em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  font-size: ${props => props.fontSize}rem;
`;

const SharedTextBox = (props) => (
  <StyledText
    size={props.size}
    backgroundColour={props.backgroundColour}
    textColour={props.textColour}
  >
    {props.text}
  </StyledText>
)

SharedTextBox.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  backgroundColour: PropTypes.string,
  textColour: PropTypes.string,
}

export default SharedTextBox;
