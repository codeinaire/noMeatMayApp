import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
  border: 5px solid #e1a904;
  border-radius: .28571429rem;
  margin: 0rem 2rem;
`

const SharedPicture = (props) => (
  <StyledImage src={props.source} alt={props.alt} height={props.height} width={props.width}/>
)

SharedPicture.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
}

export default SharedPicture;
