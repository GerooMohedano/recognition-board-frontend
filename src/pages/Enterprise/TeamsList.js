import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import ActivateIcon from '@material-ui/icons/PowerSettingsNew';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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
      openDialogActivate: false,
      undeletableTeam: false,
      nameToChange: '',
      idToChange: -1,
      idToDelete: -1,
      idToActive: -1,
      newName: '',
      nameOfTheNewTeam: '',
      photoEdit: 'questionMark.png',
      photoAdd: 'questionMark.png'
    };
  }

  toggleEditDialogState = (id, name, image, state) => {
    this.setState({
      openDialogEdit: state,
      nameToChange: name,
      idToChange: id,
      newName: '',
      photoEdit: image === null ? 'questionMark.png' : image
    });
  }

  changeNewTeamName = name => {
    this.setState({ newName: name });
  }

  changeNameOfNewTeam = name => {
    this.setState({ nameOfTheNewTeam: name });
  }

  saveNewTeamName = () => {
    const { idToChange, newName, photoEdit } = this.state
    this.props.updateTeam({ idEquipo: idToChange, nombre: newName, imagen: photoEdit });
    this.toggleEditDialogState(-1, '', 'questionMark.png', false);
  }

  toggleDeleteDialogState = (teamId, state) => {
    if (state) {
      this.props.getTeamNotes({ idEquipo: teamId });
    }
    this.setState({ idToDelete: teamId, openDialogDelete: state });
  }

  toggleAddDialogState = state => {
    this.setState({ openDialogAdd: state, nameOfTheNewTeam: '', photoAdd: 'questionMark.png' });
  }

  toggleActiveDialogState = (valueId, state, active) => {
    this.setState({ idToActive: valueId, openDialogActivate: state, activateStatus: active });
  }

  deleteConfirmation = () => {
    const { idToDelete } = this.state;
    const { teamNotes, deleteTeam } = this.props;
    if (teamNotes === undefined || teamNotes.data.data.length !== 0) {
      this.setState({ undeletableTeam: true });
    } else {
      deleteTeam({ idEquipo: idToDelete });
      this.toggleDeleteDialogState(-1, false);
    }
  }

  render() {
    const {
      openDialogEdit, openDialogDelete, openDialogAdd, openDialogActivate, photoEdit, photoAdd,
      nameToChange, idToDelete, idToActive, nameOfTheNewTeam, undeletableTeam, activateStatus
    } = this.state;
    const { changeTeamActive, deleteTeam, addNewTeam, activateTeam, desactivateTeam, addTeam } = this.props;
    const { teams, idEnterprise } = this.props;
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Teams
            </Typography>
            <List component="nav">
              {this.props.teams.map(team => (
                <ListItem>
                  <ListItemText inset primary={team.nombre_equipo} className="textOfList" />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      disabled={team.estado === 'inactivo'}
                      onClick={() => this.toggleEditDialogState(team.idEquipo, team.nombre_equipo, team.imagen, true)}
                      className="iconListButton"
                    >
                     {
                        team.estado === 'activo'
                        ? (<EditIcon style={{ color: 'black' }} />)
                        : (<EditIcon style={{ color: '#E0E0E0' }} />)
                      }
                    </IconButton>
                    </Tooltip>
                  <Tooltip title={team.estado === 'activo' ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleActiveDialogState(team.idEquipo, true, team.estado)}
                    >
                      <ActivateIcon color={team.estado === 'activo' ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                  <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(team.idEquipo, true)}
                    >
                      <DeleteIcon style={{ color: 'black' }} />
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
                    <CreateIcon style={{ color: 'black' }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openDialogEdit}
          onClose={() => this.toggleEditDialogState(-1, '', 'questionMark.png', false)}
        >
          <DialogTitle id="form-dialog-title">
            <TextField
              className="fieldInputOnDialog"
              placeholder="Change the name of the team"
              defaultValue={nameToChange}
              onChange={event => this.changeNewTeamName(event.target.value)}
            />
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleEditDialogState(-1, '', 'questionMark.png', false)}
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
            <TextField
              className="fieldInputOnDialog"
              placeholder="Write the name of the new team"
              defaultValue={nameOfTheNewTeam}
              onChange={event => this.changeNameOfNewTeam(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleAddDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {addTeam({nombre: nameOfTheNewTeam, idEmpresa: idEnterprise, imagen: photoAdd}); this.toggleAddDialogState(false)}}
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
              onClick={() => this.deleteConfirmation()}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          variant="error"
          open={undeletableTeam}
          autoHideDuration={6000}
          onClose={() => this.setState({ undeletableTeam: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Can't delete a team with notes</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ undeletableTeam: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <Dialog
          open={openDialogActivate}
          onClose={() => this.toggleActiveDialogState(-1, false, '')}
        >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to change the status of this team?
        </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleActiveDialogState(-1, false, '')}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (activateStatus === 'inactivo')
                  activateTeam({ idEquipo: idToActive })
                else
                  desactivateTeam({ idEquipo: idToActive });
                this.toggleActiveDialogState(-1, false, '')}}
              color="secondary"
            >
              {activateStatus === 'inactivo'
                ? 'Activate'
                : 'Desactivate'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TeamsList.propTypes = {
  idEnterprise: PropTypes.number.isRequired,
  teams: PropTypes.array.isRequired,
  changeTeamName: PropTypes.func.isRequired,
  //changeTeamActive: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  addNewTeam: PropTypes.func.isRequired,
  activateTeam: PropTypes.func.isRequired,
  desactivateTeam: PropTypes.func.isRequired,
  getTeamNotes: PropTypes.func.isRequired,
  addTeam: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  teamNotes: PropTypes.shape({}).isRequired
};

export default TeamsList;
