import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TableChartIcon from '@material-ui/icons/TableChart';
import NonPhoto from '../../images/questionMark.png';
import TeamCatPic from '../../images/macri.jpg';

require('./Perfil.css');

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { teams, adminGeneral } = this.props;
    return (
      <div className="cardContainerTeams">
        <Card className="cardForTeam">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Teams
            </Typography>
            <List component="nav">
              {teams.map(team => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        team.imagen === null
                        ? NonPhoto
                        : require(`../../images/${team.imagen}`)
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    inset
                    primary={team.nombre_equipo}
                    className="memberItemText"
                  />
                  {(team.estado === 'inactivo' && !adminGeneral)
                    ? (<IconButton
                      aria-label="Delete"
                      className="iconListButtonTeams"
                      disabled
                    >
                      <TableChartIcon style={{ color: '#E0E0E0' }} />
                    </IconButton>)
                    : (<Tooltip title="Go to the board of this team">
                      <NavLink
                        className="commonLink"
                        key={`NavLink${team.idEquipo}`}
                        to={`/Team/${team.idEquipo}`}
                      >
                        <IconButton
                          aria-label="Delete"
                          className="iconListButtonTeams"
                        >
                          <TableChartIcon style={{ color: 'black' }} />
                        </IconButton>
                      </NavLink>
                    </Tooltip>)
                  }
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TeamsList.propTypes = {
  teams: PropTypes.array.isRequired,
  adminGeneral: PropTypes.bool.isRequired
};

export default TeamsList;
