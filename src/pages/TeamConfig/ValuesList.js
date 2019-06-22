import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import ActivateIcon from '@material-ui/icons/PowerSettingsNew';
import DeleteIcon from '@material-ui/icons/Delete';

require('../../commons/Team.css');

class ValuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogEdit: false,
      openDialogDelete: false,
      nameToChange: '',
      idToChange: -1,
      idToDelete: -1,
      newName: ''
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

  changeNewValueName = name => {
    this.setState({ newName: name });
  }

  saveNewValueName = () => {
    const { idToChange, newName } = this.state
    this.props.changeValueName(idToChange, newName);
    this.toggleEditDialogState(-1, '', false);
  }

  toggleDeleteDialogState = (valueId, state) => {
    this.setState({ idToDelete: valueId, openDialogDelete: state });
  }

  render() {
    const { openDialogEdit, openDialogDelete, nameToChange, idToDelete } = this.state;
    const { values, changeValueActive, deleteValue } = this.props;
    return (
      <div className="cardContainer">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Values
            </Typography>
            <List component="nav">
              {values.map(value => (
                <ListItem>
                  <ListItemText inset primary={value.name} className="textOfList" />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      disabled={!value.active}
                      onClick={() => this.toggleEditDialogState(value.id, value.name, true)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={value.active ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => changeValueActive(value.id, !value.active)}
                    >
                      <ActivateIcon color={value.active ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(value.id, true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Dialog
          open={openDialogEdit}
          onClose={() => this.toggleEditDialogState(-1, '', false)}
        >
          <DialogTitle id="form-dialog-title">
            <InputBase
              placeholder="Change the name of the value"
              defaultValue={nameToChange}
              onChange={event => this.changeNewValueName(event.target.value)}
            />
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleEditDialogState(-1, '', false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.saveNewValueName()}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogDelete}
          onClose={() => this.toggleDeleteDialogState(-1, false)}
        >
          <DialogTitle id="form-dialog-title">
            Are you sure you want to delete the value? (this action is permanent)
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => this.toggleDeleteDialogState(-1, false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {deleteValue(idToDelete); this.toggleDeleteDialogState(-1, false)}}
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

ValuesList.propTypes = {
  values: PropTypes.array.isRequired,
  changeValueName: PropTypes.func.isRequired,
  changeValueActive: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired
};

export default ValuesList;