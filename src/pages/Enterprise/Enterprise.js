import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from '../../commons/LinearChart';

class Enterprise extends Component {
  render() {
    const { enterprise } = this.props;
    return (
      <div>
        <h1>IM IN { enterprise }</h1>
      </div>
    );
  }
}

Enterprise.propTypes = {
  enterprise: PropTypes.string.isRequired
};

export default Enterprise;
