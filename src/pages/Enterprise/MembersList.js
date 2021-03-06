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
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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
      openDialogActivate: false,
      undeletableMember: false,
      nameToDelete: '',
      idToDelete: -1,
      idToActive: -1,
      activateStatus: '',
      newTeamMember: { userName: '',
        mail: '', rol: false, active: true },
      updatedData: { id: -1, userName: '',
        mail: '', rol: false },
      photoAdd: 'questionMark.png',
      photoEdit: 'questionMark.png'
    };
  }

  toggleDeleteDialogState = (memberId, userName, state) => {
    if (state) {
      this.props.getNotes({ idUsuario: memberId });
    }
    this.setState({
      idToDelete: memberId,
      nameToDelete: userName,
      openDialogDelete: state
    });
  }

  openEditDialogState = member => {
    this.setState({
      openDialogEdit: true,
      updatedData: { id: member.idUsuario, userName: member.nombre_usuario,
        mail: member.mail, rol: member.rol }
    });
  }

  closeEditDialogState = () => {
    this.setState({
      openDialogEdit: false,
      updatedData: { id: -1, userName: '',
        mail: '', rol: false }, photoEdit: 'questionMark.png'
    });
  }

  toggleAddMember = value => {
    this.setState({ openDialogAdd: value,
      newTeamMember: { id: -1, userName: '',
        mail: '', rol: false, active: true }, photoAdd: 'questionMark.png' })
  }

  toggleActiveDialogState = (valueId, state, active) => {
    this.setState({ idToActive: valueId, openDialogActivate: state, activateStatus: active });
  }

  confirmAddMember = () => {
    const { newTeamMember, photoAdd } = this.state;
    const { addUser, idEnterprise } = this.props;
    addUser({ nombre: newTeamMember.userName, mail: newTeamMember.mail,
      fotoPerfil: photoAdd, idEmpresa: idEnterprise, rol: newTeamMember.rol });
    this.setState({ newTeamMember: { userName: '',
      mail: '', rol: false, active: true }, photoAdd: 'questionMark.png' });
  }

  confirmUpdateMember = () => {
    const { updatedData, photoEdit } = this.state;
    const { updateUser, idEnterprise } = this.props;
    updateUser({ idUsuario: updatedData.id, nombre: updatedData.userName,
      mail: updatedData.mail, fotoPerfil: photoEdit, rol: updatedData.rol, idEmpresa: idEnterprise });
    this.setState({
      updatedData: { id: -1, userName: '',
        mail: '', rol: false }, photoEdit: 'questionMark.png'
    });
  }

  updateMemberInfo = (value, stateAtr, subStateAtr) => {
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], [subStateAtr]: value } }));
  }

  deleteConfirmation = () => {
    const { idToDelete } = this.state;
    const { notes, deleteMember } = this.props;
    if (notes === undefined || notes.data.data.length !== 0) {
      this.setState({ undeletableMember: true });
    } else {
      deleteMember({idUsuario: idToDelete});
      this.toggleDeleteDialogState(-1, '', false);
    }
  }

  render() {
    const {
      openDialogDelete, openDialogAdd, openDialogEdit, openDialogActivate, photoAdd, photoEdit,
      idToDelete, idToActive, nameToDelete, newTeamMember, updatedData, undeletableMember, activateStatus
    } = this.state;
    const {
      changeEnterpriseMemberActive,
      deleteMember, activateMember, desactivateMember
    } = this.props;
    const {members} = this.props;
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Enterprise Members
            </Typography>
            <List component="nav">
              {this.props.members.map(member => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={member.nombre_usuario}
                    secondary={member.rol? 'admin' : null}
                    className="textOfList"
                  />
                  <Tooltip title="Edit member">
                    <IconButton
                      aria-label="Delete"
                      disabled={member.estado === 'inactivo'}
                      onClick={() => this.openEditDialogState(member)}
                    >
                        {
                        member.estado === 'activo'
                        ? (<EditIcon style={{ color: 'black' }} />)
                        : (<EditIcon style={{ color: '#E0E0E0' }} />)
                      }
                      </IconButton>
                    </Tooltip>
                  <Tooltip title={member.estado === 'activo' ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleActiveDialogState(member.idUsuario, true, member.estado)}
                    >
                      <ActivateIcon color={member.estado === 'activo' ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Kick out">
                    <IconButton
                      aria-label="Delete"
                      disabled={member.rol}
                      onClick={() => this.toggleDeleteDialogState(member.idUsuario, member.nombre_usuario, true)}
                      className="iconListButton"
                    >
                      {member.rol
                        ? (<DeleteIcon style={{ color: '#E0E0E0' }} />)
                        : (<DeleteIcon style={{ color: 'black' }} />)}
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
              onClick={() => this.deleteConfirmation()}
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
            <TextField
              className="fieldInputOnDialog"
              placeholder="User name"
              defaultValue={newTeamMember.userName}
              onChange={event => this.updateMemberInfo(event.target.value, 'newTeamMember', 'userName')}
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
                onChange={() => this.updateMemberInfo(newTeamMember.rol ? false : true, 'newTeamMember', 'rol')}
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
              disabled={newTeamMember.userName === '' || newTeamMember.mail === ''}
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
            <TextField
              className="fieldInputOnDialog"
              placeholder="User name"
              defaultValue={updatedData.userName}
              onChange={event => this.updateMemberInfo(event.target.value, 'updatedData', 'userName')}
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
                checked={updatedData.rol}
                onChange={() => this.updateMemberInfo(updatedData.rol ? false : true, 'updatedData', 'rol')}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          variant="error"
          open={undeletableMember}
          autoHideDuration={6000}
          onClose={() => this.setState({ undeletableMember: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Can't delete a member with notes</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ undeletableMember: false})}
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
            Are you sure you want to change the status of this user?
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
                  activateMember({ idUsuario: idToActive })
                else
                  desactivateMember({ idUsuario: idToActive });
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

MembersList.propTypes = {
  idEnterprise: PropTypes.number.isRequired,
  members: PropTypes.array.isRequired,
  updateEnterpriseMember: PropTypes.func.isRequired,
  changeEnterpriseMemberActive: PropTypes.func.isRequired,
  //deleteEnterpriseMember: PropTypes.func.isRequired,
  addNewEnterpriseMember: PropTypes.func.isRequired,
  addNewMember: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.shape({}).isRequired,
  deleteMember: PropTypes.func.isRequired,
  activateMember: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  desactivateMember: PropTypes.func.isRequired
};

export default MembersList;
