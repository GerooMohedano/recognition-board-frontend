import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamTable from './TeamTable';
import SprintSelector from './SprintSelector';

class Team extends Component {
  render() {
    return (
      <div>
        <h1> IM IN Team {this.props.team}</h1>
        <div>Imagen de equipo</div>
        <SprintSelector />
        <TeamTable />
      </div>
    );
  }
}

Team.propTypes = {
  team: PropTypes.string.isRequired
};

export default Team;
