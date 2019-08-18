import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Build from '@material-ui/icons/Build';
import Accept from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';

require('./Enterprise.css');

class EnterpriseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.name,
      newAddress: this.props.address,
      newTelephone: this.props.telephone,
      openDialogDelete: false
    }
  }

  updateInfo = (infoToUpdate, value) => {
    this.setState({ [infoToUpdate]: value });
  }

  saveChanges = () => {
    const { newAddress, newTelephone, newName } = this.state;
    const { changeAddress, updateName, changeConfiguring } = this.props;
    changeAddress(newAddress);
    updateName(newName);
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
    this.setState({ openDialogDelete: value });
  }

  render() {
    const { newName, newAddress, newTelephone, openDialogDelete } = this.state;
    const { configuring, name, address, telephone, changeConfiguring } = this.props;
    return (
      <Paper className="infoPaper" elevation={1}>
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
              <Button onClick={() => changeConfiguring(true)}>
                <Build />
              </Button>
            </Tooltip>
            <Tooltip title="Delete this enterprise">
              <Button onClick={() => this.toggleDeleteEnterpriseDialog(true)}>
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
              onClick={() => this.toggleDeleteEnterpriseDialog(false)}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
  changeConfiguring: PropTypes.func.isRequired
};

export default EnterpriseInfo;
