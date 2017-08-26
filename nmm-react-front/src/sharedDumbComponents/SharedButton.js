import React from 'react';
import PropTypes from 'prop-types';

const SharedButton = (props) => (
  <div>
    <button>{props.title}</button>
  </div>
)

SharedButton.propTypes = {
  test: PropTypes.string.isRequired,
}

export default SharedButton;
