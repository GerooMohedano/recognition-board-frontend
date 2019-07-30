import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import TeamTable from './TeamTable';
import SprintSelector from './SprintSelector';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Build from '@material-ui/icons/Build';
import HistoricChart from '@material-ui/icons/InsertChart';
import Yella from '../../images/yella.jpg';
import ChartPolygon from '../../commons/ChartPolygon';
import HistoricDialog from '../../commons/HistoricDialog';

require('../../commons/Team.css');

const data = [
  {
    id: 1, subject: 'Be Accountable', A: 120, B: 110, fullMark: 150,
  },
  {
    id: 2, subject: 'Be Professional', A: 98, B: 130, fullMark: 150,
  },
  {
    id: 3, subject: 'Be Proactive', A: 86, B: 130, fullMark: 150,
  },
  {
    id: 4, subject: 'Be Collaborative', A: 99, B: 100, fullMark: 150,
  },
  {
    id: 5, subject: 'Be Hardito', A: 85, B: 90, fullMark: 150,
  }
];

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openHistoricDialog: false
    };
  }

  changeHistoricDialogState = value => {
    this.setState({ openHistoricDialog: value });
  }

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
        <div className="teamDescription">
          <Avatar alt="Remy Sharp" src={Yella} className="teamAvatar" />
          <div className="chartContainer">
            <ChartPolygon data={data} width={500} height={300} />
          </div>
          <Button color="secondary" onClick={() => this.changeHistoricDialogState(true)}>
            <HistoricChart />
          </Button>
        </div>
        <SprintSelector />
        <TeamTable />
        <HistoricDialog
          open={this.state.openHistoricDialog}
          handleClose={() => this.changeHistoricDialogState(false)}
          selectValues={data.map(value => ({ id: value.id, name: value.subject}))}
        />
      </div>
    );
  }
}
/*
Team.propTypes = {
  team: PropTypes.string.isRequired
};*/
Team.propTypes = {
  classes: PropTypes.object.isRequired,
  team: PropTypes.string.isRequired,
  fetchingTeamInfo: PropTypes.bool.isRequired,
  fetchTeamInfo: PropTypes.func.isRequired,
  fetchError: PropTypes.shape({
    state: PropTypes.bool.isRequired,
    message: PropTypes.Object
  })
};

export default Team;
