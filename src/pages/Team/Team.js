import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Team extends Component {
  render() {
    return (
      <h1> IM IN Team {this.props.team}</h1>
    );
  }
}

Team.propTypes = {
  team: PropTypes.string.isRequired
};

export default Team;
