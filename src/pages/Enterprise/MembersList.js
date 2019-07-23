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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import CreateIcon from '@material-ui/icons/Add';
import ConfirmIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';
import ActivateIcon from '@material-ui/icons/PowerSettingsNew';
import CommonProfilePic from '../../images/profilepic.jpg';
import NonPhoto from '../../images/questionMark.png';

require('./Enterprise.css');

class MembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      openDialogAdd: false,
      openDialogEdit: false,
      nameToDelete: '',
      idToDelete: -1,
      newTeamMember: { userName: '', firstName: '',
        lastName: '', mail: '', rol: 0, active: true },
      updatedData: { id: -1, userName: '', firstName: '',
        lastName: '', mail: '', rol: 0 }
    };
  }

  toggleDeleteDialogState = (memberId, userName, state) => {
    this.setState({
      idToDelete: memberId,
      nameToDelete: userName,
      openDialogDelete: state
    });
  }

  openEditDialogState = member => {
    this.setState({
      openDialogEdit: true,
      updatedData: { id: member.id, userName: member.userName, firstName: member.firstName,
        lastName: member.lastName, mail: member.mail, rol: member.rol }
    });
  }

  closeEditDialogState = () => {
    this.setState({
      openDialogEdit: false,
      updatedData: { id: -1, userName: '', firstName: '',
        lastName: '', mail: '', rol: 0 }
    });
  }

  toggleAddMember = value => {
    this.setState({ openDialogAdd: value,
      newTeamMember: { id: -1, userName: '', firstName: '',
        lastName: '', mail: '', rol: 0, active: true } })
  }

  confirmAddMember = () => {
    const { newTeamMember } = this.state;
    this.props.addNewEnterpriseMember(newTeamMember.userName, newTeamMember.firstName,
      newTeamMember.lastName, newTeamMember.mail, newTeamMember.rol);
    this.setState({ newTeamMember: { userName: '', firstName: '',
      lastName: '', mail: '', rol: 0, active: true } });
  }

  confirmUpdateMember = () => {
    const { updatedData } = this.state;
    this.props.updateEnterpriseMember(updatedData.id, updatedData.userName,
      updatedData.firstName, updatedData.lastName, updatedData.mail, updatedData.rol);
    this.setState({
      updatedData: { id: -1, userName: '', firstName: '',
        lastName: '', mail: '', rol: 0 }
    });
  }

  updateMemberInfo = (value, stateAtr, subStateAtr) => {
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], [subStateAtr]: value } }));
  }

  render() {
    const {
      openDialogDelete, openDialogAdd, openDialogEdit,
      idToDelete, nameToDelete, newTeamMember, updatedData
    } = this.state;
    const {
      members, changeEnterpriseMemberActive, deleteEnterpriseMember
    } = this.props;
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Enterprise Members
            </Typography>
            <List component="nav">
              {members.map(member => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={CommonProfilePic} />
                  </ListItemAvatar>
                  <ListItemText
                    inset
                    primary={member.userName}
                    secondary={member.rol === 1 ? 'admin' : null}
                    className="memberItemText"
                  />
                  <Tooltip title="Edit member">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.openEditDialogState(member)}
                      disabled={!member.active}
                      className="iconListButton"
                    >
                      <EditIcon style={{ color: 'black' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={member.active ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => changeEnterpriseMemberActive(member.id, !member.active)}
                      className="iconListButton"
                    >
                      <ActivateIcon color={member.active ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kick out">
                    <IconButton
                      aria-label="Delete"
                      disabled={member.rol === 1}
                      onClick={() => this.toggleDeleteDialogState(member.id, member.userName, true)}
                      className="iconListButton"
                    >
                      <DeleteIcon style={{ color: 'black' }} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
              <ListItem className="addNewMember">
                <Tooltip title="Add a new member">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.toggleAddMember(true)}
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
            {`Are you sure you want to delete ${nameToDelete}? (this action is not undoable)`}
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteDialogState(-1, '', false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {deleteEnterpriseMember(idToDelete); this.toggleDeleteDialogState(-1, '', false)}}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogAdd}
          onClose={() => this.toggleAddMember(false)}
        >
          <DialogTitle id="form-dialog-title">
            Please enter the information for the new member
          </DialogTitle>
          <DialogContent>
            <div className="teamPhoto">
              <Avatar alt="Remy Sharp" src={NonPhoto} className="teamAvatar" />
              <input type="file" />
            </div>
            <TextField
              className="fieldInputOnDialog"
              placeholder="User name"
              defaultValue={newTeamMember.userName}
              onChange={event => this.updateMemberInfo(event.target.value, 'newTeamMember', 'userName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="First name"
              defaultValue={newTeamMember.firstName}
              onChange={event => this.updateMemberInfo(event.target.value, 'newTeamMember', 'firstName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Last name"
              defaultValue={newTeamMember.lastName}
              onChange={event => this.updateMemberInfo(event.target.value, 'newTeamMember', 'lastName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Mail"
              defaultValue={newTeamMember.mail}
              onChange={event => this.updateMemberInfo(event.target.value, 'newTeamMember', 'mail')}
            />
            <div style={{ display: 'inline-flex'}}>
              <Typography style={{ fontSize: '1.2em', padding: '10px' }}>
                Is this user enterprise administrator?
              </Typography>
              <Checkbox
                checked={newTeamMember.rol}
                onChange={() => this.updateMemberInfo(newTeamMember.rol === 1 ? 0 : 1, 'newTeamMember', 'rol')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleAddMember(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {this.confirmAddMember(); this.toggleAddMember(false)}}
              color="primary"
              disabled={newTeamMember.userName === ''}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogEdit}
          onClose={() => this.closeEditDialogState()}
        >
          <DialogTitle id="form-dialog-title">
            Update the information of this member
          </DialogTitle>
          <DialogContent>
            <div className="teamPhoto">
              <Avatar alt="Remy Sharp" src={NonPhoto} className="teamAvatar" />
              <input type="file" />
            </div>
            <TextField
              className="fieldInputOnDialog"
              placeholder="User name"
              defaultValue={updatedData.userName}
              onChange={event => this.updateMemberInfo(event.target.value, 'updatedData', 'userName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="First name"
              defaultValue={updatedData.firstName}
              onChange={event => this.updateMemberInfo(event.target.value, 'updatedData', 'firstName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Last name"
              defaultValue={updatedData.lastName}
              onChange={event => this.updateMemberInfo(event.target.value, 'updatedData', 'lastName')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Mail"
              defaultValue={updatedData.mail}
              onChange={event => this.updateMemberInfo(event.target.value, 'updatedData', 'mail')}
            />
            <div style={{ display: 'inline-flex'}}>
              <Typography style={{ fontSize: '1.2em', padding: '10px' }}>
                Is this user enterprise administrator?
              </Typography>
              <Checkbox
                checked={updatedData.rol === 1}
                onChange={() => this.updateMemberInfo(updatedData.rol === 1 ? 0 : 1, 'updatedData', 'rol')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.closeEditDialogState()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {this.confirmUpdateMember(); this.closeEditDialogState()}}
              color="primary"
              disabled={updatedData.userName === ''}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MembersList.propTypes = {
  members: PropTypes.array.isRequired,
  updateEnterpriseMember: PropTypes.func.isRequired,
  changeEnterpriseMemberActive: PropTypes.func.isRequired,
  deleteEnterpriseMember: PropTypes.func.isRequired,
  addNewEnterpriseMember: PropTypes.func.isRequired
};

export default MembersList;
