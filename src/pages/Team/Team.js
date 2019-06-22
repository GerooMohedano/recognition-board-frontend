import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TeamTable from './TeamTable';
import SprintSelector from './SprintSelector';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Build from '@material-ui/icons/Build';
import Yella from '../../images/yella.jpg';

require('../../commons/Team.css');

class Team extends Component {
  render() {
    return (
      <div>
        <div className="title">
          <div className="teamName"> IM IN Team {this.props.team}</div>
          <NavLink to="/TeamConfig">
            <Tooltip title="Edit this team configuration">
              <Button>
                <Build />
              </Button>
            </Tooltip>
          </NavLink>
        </div>
        <Avatar alt="Remy Sharp" src={Yella} className="teamAvatar" />
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
