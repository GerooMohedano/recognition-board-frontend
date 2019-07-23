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
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import CreateIcon from '@material-ui/icons/Add';
import ConfirmIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Clear';

require('./Enterprise.css');

class AwardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialogDelete: false,
      openDialogAdd: false,
      openDialogEdit: false,
      nameToDelete: '',
      idToDelete: -1,
      newAwardData: { name : '', description : '', conditions: [] },
      updatedAwardData: { id: -1, name : '', description : '', conditions: [] },
      conditionToAdd: { value: -1, score: 0, biggerThan: 0, otherTeamsOnly: 0 }
    };
  }

  toggleDeleteDialogState = (awardId, name, state) => {
    this.setState({
      idToDelete: awardId,
      nameToDelete: name,
      openDialogDelete: state
    });
  }

  openEditDialog = award => {
    const editableConditions = [];
    award.conditions.forEach(condition => editableConditions.push(
      { value: condition.value, score: condition.score,
        biggerThan: condition.biggerThan, otherTeamsOnly: condition.otherTeamsOnly }
    ));
    this.setState({
      openDialogEdit: true,
      updatedAwardData: { id: award.id, name : award.name, description : award.description, conditions: editableConditions },
      conditionToAdd: { value: -1, score: 0, biggerThan: 0, otherTeamsOnly: 0 }
    });
  }

  closeEditDialog = () => {
    this.setState({
      openDialogEdit: false,
      updatedAwardData: { id: -1, name : '', description : '', conditions: [] },
      conditionToAdd: { value: -1, score: 0, biggerThan: 0, otherTeamsOnly: 0 }
    });
  }

  toggleAddDialogState = value => {
    this.setState({
      openDialogAdd: value,
      newAwardData: { id: -1, name : '', description : '', conditions: [] },
      conditionToAdd: { value: -1, score: 0, biggerThan: 0, otherTeamsOnly: 0 }
    });
  }

  confirmAddAward = () => {
    const { newAwardData } = this.state;
    this.props.addNewAward(newAwardData.name, newAwardData.description, newAwardData.conditions);
    this.toggleAddDialogState(false);
  }

  confirmUpdateAward = () => {
    const { updatedAwardData } = this.state;
    this.props.updateAward(updatedAwardData.id, updatedAwardData.name,
      updatedAwardData.description, updatedAwardData.conditions);
    this.closeEditDialog();
  }

  updateAwardInfo = (value, stateAtr, subStateAtr) => {
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], [subStateAtr]: value } }));
  }

  getValueName = id => {
    const index = this.props.values.findIndex(value => value.id === id);
    if (index === -1) return 'Valor no encontrado';
    else return this.props.values[index].name;
  }

  addCondition = stateAtr => {
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], conditions: [ ...state[stateAtr].conditions, state.conditionToAdd] },
      conditionToAdd: { value: -1, score: 0, biggerThan: 0, otherTeamsOnly: 0 } }));
  }

  deleteCondition = (index, stateAtr) => {
    const newConditions = this.state[stateAtr].conditions;
    newConditions.splice(index, 1);
    this.setState(state => ({ [stateAtr]: {...state[stateAtr], conditions: newConditions }}))
  }

  render() {
    const {
      openDialogDelete, openDialogAdd, openDialogEdit,
      idToDelete, nameToDelete, newAwardData, updatedAwardData, conditionToAdd
    } = this.state;
    const { values, awards, updateAward, deleteAward, addNewAward } = this.props;
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Awards
            </Typography>
            <List component="nav">
              {awards.map(award => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={award.name}
                    className="textOfList"
                  />
                  <Tooltip title="Edit Award">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.openEditDialog(award)}
                    >
                      <EditIcon style={{ color: 'black' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.toggleDeleteDialogState(award.id, award.name, true)}
                      className="iconListButton"
                    >
                      <DeleteIcon style={{ color: 'black' }} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
              <ListItem className="addNewMember">
                <Tooltip title="Add a new award">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.toggleAddDialogState(true)}
                    className="iconListButton"
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
              onClick={() => {deleteAward(idToDelete); this.toggleDeleteDialogState(-1, '', false)}}
              color="secondary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogAdd}
          onClose={() => this.toggleAddDialogState(false)}
        >
          <DialogTitle id="form-dialog-title">
            Please enter the information for the new award
          </DialogTitle>
          <DialogContent>
            <TextField
              className="fieldInputOnDialog"
              placeholder="Award name"
              defaultValue={newAwardData.name}
              onChange={event => this.updateAwardInfo(event.target.value, 'newAwardData', 'name')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Award description"
              defaultValue={newAwardData.description}
              onChange={event => this.updateAwardInfo(event.target.value, 'newAwardData', 'description')}
            />
            <Typography style={{ marginTop: '15px' }} gutterBottom variant="h5" component="h2">
              Conditions
            </Typography>
            <List component="nav">
              <ListItem>
                <FormControl className="valueSelector">
                  <InputLabel>Value</InputLabel>
                  <Select
                    value={conditionToAdd}
                    onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'value')}
                    className="valueSelector"
                  >
                    <MenuItem value={-1}><em>None</em></MenuItem>
                    {values.map(oneValue => (<MenuItem value={oneValue.id}>{oneValue.name}</MenuItem>))}
                  </Select>
                </FormControl>
                <InputLabel>Bigger Than</InputLabel>
                <Checkbox
                  checked={conditionToAdd.biggerThan}
                  onChange={() => this.updateAwardInfo(conditionToAdd.biggerThan === 1 ? 0 : 1, 'conditionToAdd', 'biggerThan')}
                />
                <TextField
                  label="Score"
                  defaultValue={conditionToAdd.score}
                  onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'score')}
                  type="number"
                />
                <InputLabel>Only counts votes from other teams</InputLabel>
                <Checkbox
                  checked={conditionToAdd.otherTeamsOnly}
                  onChange={() => this.updateAwardInfo(conditionToAdd.otherTeamsOnly === 1 ? 0 : 1, 'conditionToAdd', 'otherTeamsOnly')}
                />
                <Tooltip title="Add this condition">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.addCondition('newAwardData')}
                    disabled={conditionToAdd.value === -1}
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
              {newAwardData.conditions.map((condition, conditionIndex) => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={`${this.getValueName(condition.value)} ${condition.biggerThan === 1 ?
                      'is bigget than' : 'is smaller than'} ${condition.score} ${condition.otherTeamsOnly === 1 ?
                      '(only counts votes from another team)' : ''}`}
                  />
                  <Tooltip title="Delete condition">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.deleteCondition(conditionIndex, 'newAwardData')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.toggleAddDialogState(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {this.confirmAddAward(); this.toggleAddDialogState(false)}}
              color="primary"
              disabled={newAwardData.name === ''}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogEdit}
          onClose={() => this.closeEditDialog()}
        >
          <DialogTitle id="form-dialog-title">
            Update the information of this award
          </DialogTitle>
          <DialogContent>
            <TextField
              className="fieldInputOnDialog"
              placeholder="Award name"
              defaultValue={updatedAwardData.name}
              onChange={event => this.updateAwardInfo(event.target.value, 'updatedAwardData', 'name')}
            />
            <TextField
              className="fieldInputOnDialog"
              placeholder="Award description"
              defaultValue={updatedAwardData.description}
              onChange={event => this.updateAwardInfo(event.target.value, 'updatedAwardData', 'description')}
            />
            <Typography style={{ marginTop: '15px' }} gutterBottom variant="h5" component="h2">
              Conditions
            </Typography>
            <List component="nav">
              <ListItem>
                <FormControl className="valueSelector">
                  <InputLabel>Value</InputLabel>
                  <Select
                    value={conditionToAdd}
                    onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'value')}
                    className="valueSelector"
                  >
                    <MenuItem value={-1}><em>None</em></MenuItem>
                    {values.map(oneValue => (<MenuItem value={oneValue.id}>{oneValue.name}</MenuItem>))}
                  </Select>
                </FormControl>
                <InputLabel>Bigger Than</InputLabel>
                <Checkbox
                  checked={conditionToAdd.biggerThan}
                  onChange={() => this.updateAwardInfo(conditionToAdd.biggerThan === 1 ? 0 : 1, 'conditionToAdd', 'biggerThan')}
                />
                <TextField
                  label="Score"
                  placeholder="Score"
                  defaultValue={conditionToAdd.score}
                  onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'score')}
                  type="number"
                />
                <InputLabel>Only counts votes from other teams</InputLabel>
                <Checkbox
                  checked={conditionToAdd.otherTeamsOnly}
                  onChange={() => this.updateAwardInfo(conditionToAdd.otherTeamsOnly === 1 ? 0 : 1, 'conditionToAdd', 'otherTeamsOnly')}
                />
                <Tooltip title="Add this condition">
                  <IconButton
                    aria-label="Delete"
                    onClick={() => this.addCondition('updatedAwardData')}
                    disabled={conditionToAdd.value === -1}
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
              {updatedAwardData.conditions.map((condition, conditionIndex) => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={`${this.getValueName(condition.value)} ${condition.biggerThan === 1 ?
                      'is bigget than' : 'is smaller than'} ${condition.score} ${condition.otherTeamsOnly === 1 ?
                      '(only counts votes from another team)' : ''}`}
                  />
                  <Tooltip title="Delete condition">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.deleteCondition(conditionIndex, 'updatedAwardData')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.closeEditDialog()}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {this.confirmUpdateAward(); this.closeEditDialog()}}
              color="primary"
              disabled={updatedAwardData.name === ''}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AwardsList.propTypes = {
  values: PropTypes.array.isRequired,
  awards: PropTypes.array.isRequired,
  updateAward: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  addNewAward: PropTypes.func.isRequired,
};

export default AwardsList;
