import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import ActivateIcon from '@material-ui/icons/PowerSettingsNew';
import CreateIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TeamCatPic from '../../images/macri.jpg';
import NonPhoto from '../../images/questionMark.png';

require('./Enterprise.css');

class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogEdit: false,
      openDialogDelete: false,
      openDialogAdd: false,
      nameToChange: '',
      idToChange: -1,
      idToDelete: -1,
      newName: '',
      nameOfTheNewTeam: ''
    };
  }

  toggleEditDialogState = (id, name, state) => {
    this.setState({
      openDialogEdit: state,
      nameToChange: name,
      idToChange: id,
      newName: ''
    });
  }

  changeNewTeamName = name => {
    this.setState({ newName: name });
  }

  changeNameOfNewTeam = name => {
    this.setState({ nameOfTheNewTeam: name });
  }

  saveNewTeamName = () => {
    const { idToChange, newName } = this.state
    this.props.changeTeamName(idToChange, newName);
    this.toggleEditDialogState(-1, '', false);
  }

  toggleDeleteDialogState = (teamId, state) => {
    this.setState({ idToDelete: teamId, openDialogDelete: state });
  }

  toggleAddDialogState = state => {
    this.setState({ openDialogAdd: state, nameOfTheNewTeam: '' });
  }

  render() {
    const {
      openDialogEdit, openDialogDelete, openDialogAdd,
      nameToChange, idToDelete, nameOfTheNewTeam
    } = this.state;
    const { teams, changeTeamActive, deleteTeam, addNewTeam } = this.props;
    return (
      <div className="cardContainer">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Teams
            </Typography>
            <List component="nav">
              {teams.map(team => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={TeamCatPic} />
                  </ListItemAvatar>
                  <ListItemText inset primary={team.name} />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      disabled={!team.active}
                      onClick={() => this.toggleEditDialogState(team.id, team.name, true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={team.active ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => changeTeamActive(team.id, !team.active)}
                    >
                      <ActivateIcon color={team.active ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(team.id, true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
              <ListItem className="addNewTeam">
                <Tooltip title="Add a new team">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.toggleAddDialogState(true)}
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openDialogEdit}
          onClose={() => this.toggleEditDialogState(-1, '', false)}
        >
          <DialogTitle id="form-dialog-title">
            <InputBase
              className="fieldInputOnDialog"
              placeholder="Change the name of the team"
              defaultValue={nameToChange}
              onChange={event => this.changeNewTeamName(event.target.value)}
            />
          </DialogTitle>
          <DialogContent id="form-dialog-title">
            <div className="teamPhoto">
              <Avatar alt="Remy Sharp" src={NonPhoto} className="teamAvatar" />
              <input type="file" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleEditDialogState(-1, '', false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.saveNewTeamName()}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogAdd}
          onClose={() => this.toggleAddDialogState(false)}
        >
          <DialogTitle id="form-dialog-title">
            Enter the name for the new team
          </DialogTitle>
          <DialogContent>
            <InputBase
              className="fieldInputOnDialog"
              placeholder="Write the name of the new team"
              defaultValue={nameOfTheNewTeam}
              onChange={event => this.changeNameOfNewTeam(event.target.value)}
            />
            <div className="teamPhoto">
              <Avatar alt="Remy Sharp" src={NonPhoto} className="teamAvatar" />
              <input type="file" />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleAddDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {addNewTeam(nameOfTheNewTeam); this.toggleAddDialogState(false)}}
              color="primary"
              disabled={nameOfTheNewTeam === ''}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogDelete}
          onClose={() => this.toggleDeleteDialogState(-1, false)}
        >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to delete this team?
        </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteDialogState(-1, false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {deleteTeam(idToDelete); this.toggleDeleteDialogState(-1, false)}}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TeamsList.propTypes = {
  teams: PropTypes.array.isRequired,
  changeTeamName: PropTypes.func.isRequired,
  changeTeamActive: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  addNewTeam: PropTypes.func.isRequired
};

export default TeamsList;
