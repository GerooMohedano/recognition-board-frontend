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
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Create';
import ActivateIcon from '@material-ui/icons/PowerSettingsNew';
import CreateIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

require('../../commons/Team.css');

class ValuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogEdit: false,
      openDialogDelete: false,
      openDialogAdd: false,
      openDialogActivate: false,
      undeletableValue: false,
      nameToChange: '',
      idToChange: -1,
      idToDelete: -1,
      idToActive: -1,
      newName: '',
      activateStatus: '',
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
    this.props.updateValue({ idValor: idToChange, nombre: newName });
    this.toggleEditDialogState(-1, '', false);
  }

  toggleDeleteDialogState = (valueId, state) => {
    if (state) {
      this.props.getValuesNotes({ idValor: valueId });
    }
    this.setState({ idToDelete: valueId, openDialogDelete: state });
  }

  toggleActiveDialogState = (valueId, state, active) => {
    this.setState({ idToActive: valueId, openDialogActivate: state, activateStatus: active });
  }

  toggleAddDialogState = state => {
    this.setState({ openDialogAdd: state, nameOfTheNewValue: '' });
  }

  deleteConfirmation = () => {
    const { idToDelete } = this.state;
    const { valuesNotes, deleteValue } = this.props;
    if (valuesNotes === undefined || valuesNotes.data.data.length !== 0) {
      this.setState({ undeletableValue: true });
    } else {
      deleteValue({ idValor: idToDelete });
      this.toggleDeleteDialogState(-1, false);
    }
  }

  render() {
    const {
      openDialogEdit, openDialogDelete, openDialogAdd, openDialogActivate,
      nameToChange, idToDelete, idToActive, nameOfTheNewValue, activateStatus, undeletableValue
    } = this.state;
    const { idTeam, values, deleteValue, addValue, activateValue, desactivateValue } = this.props;
    return (
      <div className="cardContainerTeam">
        <Card className="cardForTeam">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Values
            </Typography>
            <List component="nav">
              {values.map(value => (
                <ListItem>
                  <ListItemText inset primary={value.nombre_valor} className="textOfList" />
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Delete"
                      disabled={value.estado === 'inactivo'}
                      onClick={() => this.toggleEditDialogState(value.idValor, value.nombre_valor, true)}
                    >
                      {
                        value.estado === 'activo'
                        ? (<EditIcon style={{ color: 'black' }} />)
                        : (<EditIcon style={{ color: '#E0E0E0' }} />)
                      }
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={value.estado === 'activo' ? "Desactivate" : "Activate"}>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleActiveDialogState(value.idValor, true, value.estado)}
                    >
                      <ActivateIcon color={value.estado === 'activo' ? "primary" : "secondary"} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(value.idValor, true)}
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
          open={openDialogAdd}
          onClose={() => this.toggleAddDialogState(false)}
        >
          <DialogTitle id="form-dialog-title">
            Enter the name for the new value
          </DialogTitle>
          <DialogContent>
            <InputBase
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
              onClick={() => addValue({ nombre: nameOfTheNewValue, idEquipo: idTeam })}
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
              onClick={() => this.deleteConfirmation()}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogActivate}
          onClose={() => this.toggleActiveDialogState(-1, false, '')}
        >
        <DialogTitle id="form-dialog-title">
          Are you sure you want to change the status of this value?
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
                  activateValue({ idValor: idToActive, idEquipo: idTeam })
                else
                  desactivateValue({ idValor: idToActive, idEquipo: idTeam });
                this.toggleActiveDialogState(-1, false, '')}}
              color="secondary"
            >
              {activateStatus === 'inactivo'
                ? 'Activate'
                : 'Desactivate'}
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

ValuesList.propTypes = {
  idTeam: PropTypes.number.isRequired,
  values: PropTypes.array.isRequired,
  updateValue: PropTypes.func.isRequired,
  deleteValue: PropTypes.func.isRequired,
  activateValue: PropTypes.func.isRequired,
  desactivateValue: PropTypes.func.isRequired,
  getValuesNotes: PropTypes.func.isRequired,
  valuesNotes: PropTypes.shape({}).isRequired,
  addValue: PropTypes.func.isRequired
};

export default ValuesList;
