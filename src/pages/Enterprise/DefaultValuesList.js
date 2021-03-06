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
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import CreateIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
//import { deleteDefaultValue } from './EnterpriseAction';

require('../../commons/Team.css');

class DefaultValuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogEdit: false,
      openDialogDelete: false,
      openDialogAdd: false,
      undeletableValue: false,
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
    this.props.updateValue ({ idValor : idToChange, nombre : newName });
    this.toggleEditDialogState(-1, '', false);
  }

  toggleDeleteDialogState = (valueId, state) => {
    if (state) {
      this.props.getValuesNotes({ idValor: valueId });
    }
    this.setState({ idToDelete: valueId, openDialogDelete: state });
  }

  toggleAddDialogState = state => {
    this.setState({ openDialogAdd: state, nameOfTheNewValue: '' });
  }

  confirmDeleteValue = () => {
    const { idToDelete } = this.state;
    const { valuesNotes, deleteDefaultValue } = this.props;
    if (valuesNotes === undefined || valuesNotes.data.data.length !== 0) {
      this.setState({ undeletableValue: true });
    } else {
      deleteDefaultValue({ idValor: idToDelete });
      this.toggleDeleteDialogState(-1, false);
    }
  }

  render() {
    const {
      openDialogEdit, openDialogDelete, openDialogAdd,
      nameToChange, idToDelete, nameOfTheNewValue, undeletableValue
    } = this.state;
    const { values, deleteDefaultValue, addValue, enterpriseId } = this.props;
    console.log("ID EMPRESA PARA DEFAULT VALUES: ", enterpriseId);
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Default Values
            </Typography>
            <List component="nav">
              {this.props.values.map(value => (
                <ListItem>
                  <ListItemText inset primary={value.Valor} className="textOfList" />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleEditDialogState(value.idValor, value.Valor, true)}
                      className="iconListButton"
                    >
                      <EditIcon style={{ color: 'black' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(value.idValor, true)}
                      className="iconListButton"
                    >
                      <DeleteIcon style={{ color: 'black' }} />
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
                    <CreateIcon style={{ color: 'black' }} />
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
            <TextField
              className="fieldInputOnDialog"
              placeholder="Change value name"
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
            <TextField
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
              onClick={() => addValue({ nombre: nameOfTheNewValue, idEmpresa: enterpriseId })}
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
              onClick={() => this.confirmDeleteValue()}
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
          open={undeletableValue}
          autoHideDuration={6000}
          onClose={() => this.setState({ undeletableValue: false})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Can't delete a value with notes</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="secondary"
              onClick={() => this.setState({ undeletableValue: false})}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

DefaultValuesList.propTypes = {
  values: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  addValue: PropTypes.func.isRequired,
  //deleteValue: PropTypes.func.isRequired,
  addNewValue: PropTypes.func.isRequired,
  deleteDefaultValue:PropTypes.func.isRequired,
  enterpriseId: PropTypes.number.isRequired,
  gettingValuesNotes: PropTypes.bool.isRequired,
  getValuesNotes: PropTypes.func.isRequired,
  valuesNotes: PropTypes.shape({}).isRequired
};

export default DefaultValuesList;
