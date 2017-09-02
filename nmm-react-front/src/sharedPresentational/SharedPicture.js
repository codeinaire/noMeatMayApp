import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
  border: 5px solid #e1a904;
  border-radius: .28571429rem;
`

const SharedPicture = (props) => (
  <StyledImage src={props.source} alt={props.alt}/>
)

SharedPicture.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default SharedPicture;
