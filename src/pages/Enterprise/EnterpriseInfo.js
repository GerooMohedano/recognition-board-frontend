import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Build from '@material-ui/icons/Build';
import Accept from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import { modifyEnterprise } from './EnterpriseAction';
import Enterprise from './Enterprise';

require('./Enterprise.css');

class EnterpriseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.name,
      newAddress: this.props.address,
      newTelephone: this.props.telephone,
      openDialogDelete: false,
      undeletableEnterprise: false
    }
  }

  updateInfo = (infoToUpdate, value) => {
    this.setState({ [infoToUpdate]: value });
  }

  saveChanges = () => {
    const { newAddress, newTelephone, newName } = this.state;
    const { enterpriseId, modifyEnterprise, changeAddress, updateName, changeConfiguring } = this.props;
   // changeAddress(newAddress);
    updateName(newName);
    console.log("IDEMPRESAAAAAAAAAAAA",enterpriseId);
    console.log("DIREC",newAddress);
    console.log("TEL",newTelephone);
    modifyEnterprise({
    idEmpresa: enterpriseId,
    direccion: newAddress,
    telefono: newTelephone
    });
    changeConfiguring(false);
  }

  undoChanges = () => {
    const { address, telephone, name } = this.props;
    this.setState({
      newName: name,
      newAddress: address,
      newTelephone: telephone
    });
    this.props.changeConfiguring(false);
  }

  toggleDeleteEnterpriseDialog = value => {
    const { getEnterpriseNotes, enterpriseId } = this.props;
    if (value) {
      getEnterpriseNotes({ idEmpresa: enterpriseId });
    }
    this.setState({ openDialogDelete: value });
  }

  deleteConfirmation = () => {
    const { enterpriseNotes, deleteEnterprise, enterpriseId } = this.props;
    if (enterpriseNotes === undefined || enterpriseNotes.data.data.length !== 0) {
      this.setState({ undeletableEnterprise: true });
    } else {
      deleteEnterprise({ idEmpresa: enterpriseId });
      this.toggleDeleteEnterpriseDialog(false);
    }
  }

  render() {
    const { newName, newAddress, newTelephone, openDialogDelete, undeletableEnterprise } = this.state;
    const { configuring, name, address, telephone, modifyEnterprise, changeConfiguring, canConfigure } = this.props;
    return (
      <Paper className="infoPaper" elevation={3}>
      {configuring
        ? (
          <div>
            <Tooltip title="Apply changes">
              <Button onClick={() => this.saveChanges()}>
                <Accept />
              </Button>
            </Tooltip>
            <Tooltip title="Cancel">
              <Button onClick={() => this.undoChanges()}>
                <Cancel />
              </Button>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip title="Edit this enterprise info">
              <Button disabled={!canConfigure} onClick={() => changeConfiguring(true)}>
                <Build />
              </Button>
            </Tooltip>
            <Tooltip title="Delete this enterprise">
              <Button disabled={!canConfigure} onClick={() => this.toggleDeleteEnterpriseDialog(true)}>
                <Delete />
              </Button>
            </Tooltip>
          </div>
        )}
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="Name"
            value={newName}
            onChange={event => this.updateInfo('newName', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" variant="h5" component="h3">
            {newName}
          </Typography>
        )}
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="Address"
            value={newAddress}
            onChange={event => this.updateInfo('newAddress', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newAddress}</Typography>
        )}
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="Telephone"
            value={newTelephone}
            onChange={event => this.updateInfo('newTelephone', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newTelephone}</Typography>
        )}
        <Dialog
          open={openDialogDelete}
          onClose={() => this.toggleDeleteEnterpriseDialog(false)}
        >
          <DialogTitle>
            Are you sure you want to delete the entire enterprise? (this action is undoable)
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteEnterpriseDialog(false)}
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
          open={undeletableEnterprise}
          autoHideDuration={6000}
          onClose={() => this.setState({ undeletableEnterprise: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Can't delete an enterprise with notes</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ undeletableEnterprise: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Paper>
    );
  }
}

EnterpriseInfo.propTypes = {
  configuring: PropTypes.bool.isRequired,
  info: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  changeAddress: PropTypes.func.isRequired,
  changeConfiguring: PropTypes.func.isRequired,
  modifyEnterprise: PropTypes.func.isRequired,
  enterpriseId: PropTypes.number.isRequired,
  enterpriseNotes: PropTypes.shape({}).isRequired,
  getEnterpriseNotes: PropTypes.func.isRequired,
  deleteEnterprise: PropTypes.func.isRequired,
  canConfigure: PropTypes.bool.isRequired
};

export default EnterpriseInfo;
