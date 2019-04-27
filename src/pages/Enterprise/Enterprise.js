import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Enterprise extends Component {
  render() {
    const { enterprise } = this.props;
    return (
      <h1>IM IN { enterprise }</h1>
    );
  }
}

Enterprise.propTypes = {
  enterprise: PropTypes.string.isRequired
};

export default Enterprise;
