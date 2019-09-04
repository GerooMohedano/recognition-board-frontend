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
      myAward:  {},
      idLogro : 0,
      openDialogDelete: false,
      openDialogAdd: false,
      openDialogEdit: false,
      nameToDelete: '',
      idToDelete: -1,
      newAwardData: { name : '', description : '', conditions: [] },
      updatedAwardData: { id: -1, name : '', description : '', conditions: [] },
      conditionToAdd: { idValor: -1, puntuacion: 0, modificador: false, excluyente: 0}
    };
  }
/*
  componentDidMount(){
    const { getConditions, match } = this.props;
    getConditions(this.state.idLogro);
  }

  componentDidUpdate(prevProps) {
    const {
      getConditions, conditionAdded,
      match
    } = this.props;
    console.log(prevProps ,conditionAdded )
    if (prevProps.conditionAdded !== conditionAdded && conditionAdded && conditionAdded.data.status === 'OK') {
      getConditions(this.state.idLogro);
    }
  }
*/


  toggleDeleteDialogState = (awardId, name, state) => {
    this.setState({
      idToDelete: awardId,
      nameToDelete: name,
      openDialogDelete: state
    });
  }

  openEditDialog = award => {
    const editableConditions = [];
    this.state.myAward = award;
    this.state.idLogro =  award.idLogro;
    this.props.getConditions({idLogro : award.idLogro});
    /*this.conditions.data.forEach(condition => editableConditions.push(
      { value: condition.value, puntuacion: condition.puntuacion,
        modificador: condition.modificador, excluyente: condition.excluyente }
    ));*/
    this.setState({
      openDialogEdit: true,
      updatedAwardData: { id: award.id, name : award.nombre_logro, description : award.descripcion},//, conditions: editableConditions },
      conditionToAdd: { idValor: -1, puntuacion: 0, modificador: false, excluyente: 0}
    });
  }

  closeEditDialog = () => {
    this.setState({
      openDialogEdit: false,
      updatedAwardData: { id: -1, name : '', description : ''},
      conditionToAdd: { idValor: -1, puntuacion: 0, modificador: false, excluyente: 0 }
    });
  }

  toggleAddDialogState = value => {
    this.setState({
      openDialogAdd: value,
      newAwardData: { id: -1, name : '', description : '', conditions: [] },
      conditionToAdd: { idValor: -1, puntuacion: 0, modificador: false, excluyente: 0 }
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
    console.log("-----",value, stateAtr, subStateAtr)
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], [subStateAtr]: value } }));

  }

  getValueName = id => {
    const index = this.props.values.findIndex(value => value.idValor === id);
    if (index === -1) return 'Valor no encontrado';
    else return this.props.values[index].Valor;
  }

  updateConditionsAfterDelete(idCondicion) {
    console.log("updateConditionsAfterDelete" , this.props.conditions, idCondicion);
    var newConditions = [];
    for(var i = 0; i < this.props.conditions.data.data.length; i ++) {
      if(this.props.conditions.data.data[i].idCondicion != idCondicion) newConditions.push(this.props.conditions.data.data[i])
    }
    this.props.conditions.data.data = newConditions;
    console.log(this.props.conditions.data.data)
    this.closeEditDialog();
    this.openEditDialog(this.state.myAward);
    //this.props.conditions
  }

  /*addCondition = stateAtr => {
    this.setState(state => ({ [stateAtr]: { ...state[stateAtr], conditions: [ ...state[stateAtr].conditions, state.conditionToAdd] },
      conditionToAdd: { idValor: -1, puntuacion: 0, modificador: false, excluyente: 0} }));
  }*/

  /*deleteCondition = (index, stateAtr) => {
    const newConditions = this.state[stateAtr].conditions;
    newConditions.splice(index, 1);
    this.setState(state => ({ [stateAtr]: {...state[stateAtr], conditions: newConditions }}))
  }*/
  ListConditions = () => {
    const { conditions, gettingConditions } = this.props;
    if (conditions !== undefined && conditions.data !== undefined && !gettingConditions){
      console.log("CONDITIONSSS",conditions.data.data);
      return conditions.data.data.map((condition, conditionIndex) => (
        <ListItem>
          <ListItemText
            inset
            primary={`${this.getValueName(condition.idValor)} ${condition.modificador == true ?
              'is bigger than' : 'is smaller than'} ${condition.puntuacion} ${condition.excluyente == true ?
              '(only counts votes from another team)' : ''}`}
          />
          <Tooltip title="Delete condition">
            <IconButton
              aria-label="Delete"
              onClick={
                 () => {
                   this.props.deleteCondition({ idLogro: this.state.idLogro, idCondicion: condition.idCondicion});
                   this.closeEditDialog();
                   /*this.updateConditionsAfterDelete(condition.idCondicion);
                   this.openEditDialog(this.state.myAward);*/
                  }
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      ))
      }

  }
  render() {
    const {
      openDialogDelete, openDialogAdd, openDialogEdit,
      idToDelete, nameToDelete, newAwardData, updatedAwardData, conditionToAdd
    } = this.state;
    const { values, awards, updateAward, deleteAward, addNewAward,
            conditions, gettingConditions, getConditions, addAward, enterpriseId, addCondition, deleteCondition } = this.props;
    return (
      <div className="cardContainer">
        <Card className="cardForEnterprise">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Awards
            </Typography>
            <List component="nav">
              {this.props.awards.map(award => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={award.nombre_logro}
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
                      onClick={() => this.toggleDeleteDialogState(award.idLogro, award.nombre_logro, true)}
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
              onClick={() => {deleteAward({ idLogro: idToDelete }); this.toggleDeleteDialogState(-1, false)}}
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
            <List component="nav">
              <ListItem>

              </ListItem>
              {newAwardData.conditions.map((condition, conditionIndex) => (
                <ListItem>
                  <ListItemText
                    inset
                    primary={`${this.getValueName(condition.value)} ${condition.modificador === true ?
                      'is bigget than' : 'is smaller than'} ${condition.puntuacion} ${condition.excluyente === 1 ?
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
              onClick={() => addAward({ nombre: newAwardData.name, descripcion: newAwardData.description, idEmpresa: enterpriseId })}
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
                    value={conditionToAdd.idValor}
                    onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'idValor')}
                    className="valueSelector"
                  >
                    <MenuItem value={-1}><em>None</em></MenuItem>
                    {values.map(oneValue => (<MenuItem value={oneValue.idValor}>{oneValue.Valor}</MenuItem>))}
                  </Select>
                </FormControl>
                <InputLabel>Bigger Than</InputLabel>
                <Checkbox
                  checked={conditionToAdd.modificador}
                  onChange={() => this.updateAwardInfo(conditionToAdd.modificador === true ? false : true, 'conditionToAdd', 'modificador')}
                />
                <TextField
                  label="Score"
                  placeholder="Score"
                  defaultValue={conditionToAdd.puntuacion}
                  onChange={event => this.updateAwardInfo(event.target.value, 'conditionToAdd', 'puntuacion')}
                  type="number"
                />
                <InputLabel>Only counts votes from other teams</InputLabel>
                <Checkbox
                  checked={conditionToAdd.excluyente}
                  onChange={() => this.updateAwardInfo(conditionToAdd.excluyente === 1 ? 0 : 1, 'conditionToAdd', 'excluyente')}
                />
                <Tooltip title="Add this condition">
                  <IconButton
                    aria-label="Delete"
                  //  onClick={() => this.addCondition('updatedAwardData')}
                    onClick={
                      () =>{
                        this.props.addCondition({ idLogro: this.state.idLogro, idCondicion : 0 , idValor: conditionToAdd.idValor , puntuacion : conditionToAdd.puntuacion, modificador : conditionToAdd.modificador, excluyente: conditionToAdd.excluyente });
                        this.closeEditDialog();
                      }
                    }
                    disabled={conditionToAdd.value === -1}
                    th
                  >
                    <CreateIcon />
                  </IconButton>
                </Tooltip>
              </ListItem>
                {this.ListConditions()}
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
              onClick={() => {
                this.props.updateAward({ idLogro: this.state.idLogro, nombre: updatedAwardData.name, descripcion: updatedAwardData.description});
                this.closeEditDialog()}}
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
  addNewAward: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  gettingConditions: PropTypes.bool.isRequired,
  conditions: PropTypes.shape({}).isRequired,
  getConditions: PropTypes.func.isRequired,
  enterpriseId: PropTypes.number.isRequired,//para crear el logro
  addAward: PropTypes.func.isRequired,
  addCondition: PropTypes.func.isRequired,
  updateAward: PropTypes.func.isRequired,
  deleteCondition:  PropTypes.func.isRequired
};

export default AwardsList;
