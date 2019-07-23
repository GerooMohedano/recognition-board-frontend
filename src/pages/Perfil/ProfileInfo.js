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

require('./Perfil.css');

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFirstName: this.props.info.firstName,
      newLastName: this.props.info.lastName,
      newDescription: this.props.info.description
    }
  }

  updateInfo = (infoToUpdate, value) => {
    this.setState({ [infoToUpdate]: value });
  }

  saveChanges = () => {
    const { newFirstName, newLastName, newDescription } = this.state;
    const { changeInfo, changeConfiguring } = this.props;
    changeInfo(newFirstName, newLastName, newDescription);
    changeConfiguring(false);
  }

  undoChanges = () => {
    const { info } = this.props;
    this.setState({
      newFirstName: info.firstName,
      newLastName: info.lastName,
      newDescription: info.description
    });
    this.props.changeConfiguring(false);
  }

  render() {
    const { newFirstName, newLastName, newDescription } = this.state;
    const { configuring, changeConfiguring, name } = this.props;
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
            <Tooltip title="Edit your info">
              <Button onClick={() => changeConfiguring(true)}>
                <Build />
              </Button>
            </Tooltip>
          </div>
        )}
        <Typography className="infoLine" variant="h5" component="h3">
          {name}
        </Typography>
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="First Name"
            value={newFirstName}
            onChange={event => this.updateInfo('newFirstName', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newFirstName}</Typography>
        )}
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="Last Name"
            value={newLastName}
            onChange={event => this.updateInfo('newLastName', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newLastName}</Typography>
        )}
        {configuring
        ? (
          <TextField
            className="infoLine"
            label="Description"
            value={newDescription}
            onChange={event => this.updateInfo('newDescription', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newDescription}</Typography>
        )}
      </Paper>
    );
  }
}

ProfileInfo.propTypes = {
  configuring: PropTypes.bool.isRequired,
  info: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  changeInfo: PropTypes.func.isRequired,
  changeConfiguring: PropTypes.func.isRequired
};

export default ProfileInfo;
