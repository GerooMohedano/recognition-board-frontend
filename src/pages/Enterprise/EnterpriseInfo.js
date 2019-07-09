import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Build from '@material-ui/icons/Build';
import Accept from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Clear';

require('./Enterprise.css');

class EnterpriseInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: this.props.name,
      newAddress: this.props.info.address,
      newCity: this.props.info.city,
      newTelephone: this.props.info.telephone
    }
  }

  updateInfo = (infoToUpdate, value) => {
    this.setState({ [infoToUpdate]: value });
  }

  saveChanges = () => {
    const { newAddress, newCity, newTelephone, newName } = this.state;
    const { changeInfo, updateName, changeConfiguring } = this.props;
    changeInfo(newAddress, newCity, newTelephone);
    updateName(newName);
    changeConfiguring(false);
  }

  undoChanges = () => {
    const { info, name } = this.props;
    this.setState({
      newName: name,
      newAddress: info.address,
      newCity: info.city,
      newTelephone: info.telephone
    });
    this.props.changeConfiguring(false);
  }

  render() {
    const { newName, newAddress, newCity, newTelephone } = this.state;
    const { configuring, name, changeConfiguring } = this.props;
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
          <Tooltip title="Edit this enterprise info">
            <Button onClick={() => changeConfiguring(true)}>
              <Build />
            </Button>
          </Tooltip>
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
            label="City"
            value={newCity}
            onChange={event => this.updateInfo('newCity', event.target.value)}
          />
        ) : (
          <Typography className="infoLine" component="p">{newCity}</Typography>
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
      </Paper>
    );
  }
}

EnterpriseInfo.propTypes = {
  configuring: PropTypes.bool.isRequired,
  info: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  changeInfo: PropTypes.func.isRequired,
  changeConfiguring: PropTypes.func.isRequired
};

export default EnterpriseInfo;
