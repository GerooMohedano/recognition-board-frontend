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
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import CreateIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

require('../../commons/Team.css');

class DefaultValuesList extends Component {
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
      nameOfTheNewValue: ''
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

  changeNameOfNewValue = name => {
    this.setState({ nameOfTheNewValue: name });
  }

  saveNewValueName = () => {
    const { idToChange, newName } = this.state
    this.props.changeValueName(idToChange, newName);
    this.toggleEditDialogState(-1, '', false);
  }

  toggleDeleteDialogState = (valueId, state) => {
    this.setState({ idToDelete: valueId, openDialogDelete: state });
  }

  toggleAddDialogState = state => {
    this.setState({ openDialogAdd: state, nameOfTheNewValue: '' });
  }

  render() {
    const {
      openDialogEdit, openDialogDelete, openDialogAdd,
      nameToChange, idToDelete, nameOfTheNewValue
    } = this.state;
    const { values, deleteValue, addNewValue } = this.props;
    return (
      <div className="cardContainer">
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Default Values
            </Typography>
            <List component="nav">
              {values.map(value => (
                <ListItem>
                  <ListItemText inset primary={value.name} className="textOfList" />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleEditDialogState(value.id, value.name, true)}
                    >
                      <EditIcon />
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
              <ListItem className="addNewMember">
                <Tooltip title="Add a new value">
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
          open={openDialogAdd}
          onClose={() => this.toggleAddDialogState(false)}
        >
          <DialogTitle id="form-dialog-title">
            Enter the name for the new value
          </DialogTitle>
          <DialogContent>
            <InputBase
              className="fieldInputOnDialog"
              placeholder="Write the name of the new value"
              defaultValue={nameOfTheNewValue}
              onChange={event => this.changeNameOfNewValue(event.target.value)}
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
              onClick={() => {addNewValue(nameOfTheNewValue); this.toggleAddDialogState(false)}}
              color="primary"
              disabled={nameOfTheNewValue === ''}
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
          Are you sure you want to delete this value?
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

DefaultValuesList.propTypes = {
  values: PropTypes.array.isRequired,
  changeValueName: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired,
  addNewValue: PropTypes.func.isRequired
};

export default DefaultValuesList;
