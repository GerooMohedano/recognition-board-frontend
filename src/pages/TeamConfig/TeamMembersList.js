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
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Add';
import ConfirmIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
import CommonProfilePic from '../../images/profilepic.jpg';
import Autocomplete from '../../commons/CustomAutocomplete';

require('../../commons/Team.css');

class TeamMembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      nameToDelete: '',
      idToDelete: -1,
      addingANewMember: false,
      newTeamMember: { id: -1, name: '' }
    };
  }

  toggleDeleteDialogState = (valueId, name, state) => {
    this.setState({
      idToDelete: valueId,
      nameToDelete: name,
      openDialogDelete: state
    });
  }

  toggleAddingMember = value => {
    this.setState({ addingANewMember: value, newTeamMember: { id: -1, name: '' } })
  }

  selectNewMember = value => {
    this.setState({ newTeamMember: value })
  }

  confirmAddingMember = () => {
    const { addTeamMember, idTeam } =this.props;
    const { newTeamMember } = this.state;
    addTeamMember({
      idEquipo: idTeam,
      idUsuario: newTeamMember.id,
      rol: 0,
      estado: 'activo'
    });
    this.setState({ newTeamMember: { id: -1, name: '' } })
  }

  render() {
    const { openDialogDelete, idToDelete, nameToDelete, addingANewMember, newTeamMember } = this.state;
    const { members, deleteMember, teamLeader, enterpriseMembers, idTeam } = this.props;
    console.log(members);
    return (
      <div className="cardContainerTeam">
        <Card className="cardForTeam">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Team Members
            </Typography>
            <List component="nav">
              {members.map(member => {
                if (member.estado === 'activo' || (member.estado === 'inactivo' && member.idUsuario === teamLeader))
                return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={CommonProfilePic} />
                  </ListItemAvatar>
                  <ListItemText
                    inset
                    primary={member.estado === 'inactivo' ? `${member.nombre_usuario} (desactivated)` : member.nombre_usuario}
                    secondary={member.idUsuario === teamLeader ? 'team leader' : null}
                  />
                  <Tooltip title="Kick out">
                    <IconButton
                      aria-label="Delete"
                      disabled={member.idUsuario === teamLeader}
                      onClick={() => this.toggleDeleteDialogState(member.idUsuario, member.nombre_usuario, true)}
                    >
                      {
                        member.idUsuario !== teamLeader
                        ? (<DeleteIcon style={{ color: 'black' }} />)
                        : (<DeleteIcon style={{ color: '#E0E0E0' }} />)
                      }
                    </IconButton>
                  </Tooltip>
                </ListItem>
              )})}
              {addingANewMember
              && (
                <ListItem>
                  <Autocomplete
                    data={enterpriseMembers.filter(enterpriseMember => (
                      members.findIndex(member => member.idUsuario === enterpriseMember.idUsuario) === -1
                  )).map(enterpriseMember => ({ id: enterpriseMember.idUsuario, name: enterpriseMember.nombre_usuario }))}
                    upperFunction={this.selectNewMember}
                    placeholder="Search for a member in the enterprise"
                    labelName="name"
                  />
                  <Tooltip title="Confirm">
                    <IconButton
                      aria-label="Delete"
                      disabled={newTeamMember.name === ''}
                      onClick={() => this.confirmAddingMember(newTeamMember)}
                    >
                      <ConfirmIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton aria-label="Delete" onClick={() => this.toggleAddingMember(false)}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              )}
              <ListItem className="addNewMember">
                <Tooltip title="Add a new member">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.toggleAddingMember(true)}
                  >
                    <CreateIcon style={{ color: 'black' }} />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openDialogDelete}
          onClose={() => this.toggleDeleteDialogState(-1, '', false)}
        >
          <DialogTitle id="form-dialog-title">
            {`Are you sure you want to kick out ${nameToDelete} from the team?`}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteDialogState(-1, '', false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {deleteMember({ idUsuario: idToDelete, idEquipo: idTeam }); this.toggleDeleteDialogState(-1, '', false)}}
              color="secondary"
            >
              Kick out
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

TeamMembersList.propTypes = {
  idTeam: PropTypes.number.isRequired,
  members: PropTypes.array.isRequired,
  deleteMember: PropTypes.func.isRequired,
  teamLeader: PropTypes.string.isRequired,
  enterpriseMembers: PropTypes.array.isRequired,
  addTeamMember: PropTypes.func.isRequired
};

export default TeamMembersList;
