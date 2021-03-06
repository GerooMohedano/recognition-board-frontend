import * as types from './TeamConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingTeams() {
  return {
    type: types.FETCHING_TEAMS,
    payload: {}
  };
}

export function fetchTeamsSuccess(data) {
  return {
    type: types.FETCH_TEAMS_SUCCESS,
    teamInfo: data
  };
}

export function fetchTeamsFailure(error) {
  return {
    type: types.FETCH_TEAMS_FAILURE,
    payload: error
  };
}

export function fetchTeams(idTeam) {
  return function (dispatch) {
    dispatch(fetchingTeams());
    return request.get(`${baseUrl()}/equipo/${idTeam}`)
      .then(response => dispatch(fetchTeamsSuccess(response)))
      .catch(error => dispatch(fetchTeamsFailure(error)));
  };
}

export function checkingAwards() {
  return {
    type: types.CHECKING_AWARDS,
    payload: {}
  };
}

export function checkAwardsSuccess(data) {
  return {
    type: types.CHECK_AWARDS_SUCCESS,
    awardsChecked: data
  };
}

export function checkAwardsFailure(error) {
  return {
    type: types.CHECK_AWARDS_FAILURE,
    payload: error
  };
}

export function checkAwards(info) {
  return function (dispatch) {
    dispatch(checkingAwards());
    return request.post(`${baseUrl()}/checkeoLogros`, info)
      .then(response => dispatch(checkAwardsSuccess(response)))
      .catch(error => dispatch(checkAwardsFailure(error)));
  };
}

export function gettingHistoricValues() {
  return {
    type: types.GETTING_HISTORIC_VALUES,
    payload: {}
  };
}

export function getHistoricValuesSuccess(data) {
  return {
    type: types.GET_HISTORIC_VALUES_SUCCESS,
    historicValues: data
  };
}


export function getHistoricValuesFailure(error) {
  return {
    type: types.GET_HISTORIC_VALUES_FAILURE,
    payload: error
  };
}

export function getHistoricValues(valuesInfo) {
  return function (dispatch) {
    dispatch(gettingHistoricValues());
    return request.post(`${baseUrl()}/HistoricoValorEquipo`, valuesInfo)
      .then(response => dispatch(getHistoricValuesSuccess(response)))
      .catch(error => dispatch(getHistoricValuesFailure(error)));
  };
}

export function gettingNotes() {
  return {
    type: types.GETTING_NOTES,
    payload: {}
  };
}

export function getNotesSuccess(data) {
  return {
    type: types.GET_NOTES_SUCCESS,
    notes: data
  };
}


export function getNotesFailure(error) {
  return {
    type: types.GET_NOTES_FAILURE,
    payload: error
  };
}

export function getNotes(notesRequested) {
  return function (dispatch) {
    dispatch(gettingNotes());
    return request.post(`${baseUrl()}/notasUsuario`, notesRequested)
      .then(response => dispatch(getNotesSuccess(response)))
      .catch(error => dispatch(getNotesFailure(error)));
  };
}

export function gettingSprintNotes() {
  return {
    type: types.GETTING_SPRINT_NOTES,
    payload: {}
  };
}

export function getSprintNotesSuccess(data) {
  return {
    type: types.GET_SPRINT_NOTES_SUCCESS,
    sprintNotes: data
  };
}


export function getSprintNotesFailure(error) {
  return {
    type: types.GET_SPRINT_NOTES_FAILURE,
    payload: error
  };
}

export function getSprintNotes(notesRequested) {
  return function (dispatch) {
    dispatch(gettingSprintNotes());
    return request.post(`${baseUrl()}/consultarNotasPizarra`, notesRequested)
      .then(response => dispatch(getSprintNotesSuccess(response)))
      .catch(error => dispatch(getSprintNotesFailure(error)));
  };
}

export function creattingNote() {
  return {
    type: types.CREATING_NOTE,
    payload: {}
  };
}

export function createNoteSuccess(data) {
  return {
    type: types.CREATE_NOTE_SUCCESS,
    noteCreated: data
  };
}


export function createNoteFailure(error) {
  return {
    type: types.CREATE_NOTE_FAILURE,
    payload: error
  };
}

export function createNote(noteToCreate) {
  return function (dispatch) {
    dispatch(creattingNote());
    return request.post(`${baseUrl()}/nuevaNota`, noteToCreate)
      .then(response => dispatch(createNoteSuccess(response)))
      .catch(error => dispatch(createNoteFailure(error)));
  };
}

export function delettingNote() {
  return {
    type: types.DELETTING_NOTE,
    payload: {}
  };
}

export function deleteNoteSuccess(data) {
  return {
    type: types.DELETE_NOTE_SUCCESS,
    noteDeleted: data
  };
}


export function deleteNoteFailure(error) {
  return {
    type: types.DELETE_NOTE_FAILURE,
    payload: error
  };
}

export function deleteNote(noteToDelete) {
  return function (dispatch) {
    dispatch(delettingNote());
    return request.post(`${baseUrl()}/borrarNota`, noteToDelete)
      .then(response => dispatch(deleteNoteSuccess(response)))
      .catch(error => dispatch(deleteNoteFailure(error)));
  };
}

export function modifyingSprint() {
  return {
    type: types.MODIFYING_SPRINT,
    payload: {}
  };
}

export function modifySprintSuccess(data) {
  return {
    type: types.MODIFY_SPRINT_SUCCESS,
    sprintModified: data
  };
}


export function modifiySprintFailure(error) {
  return {
    type: types.MODIFY_SPRINT_FAILURE,
    payload: error
  };
}

export function modifySprint(newSprintInfo) {
  return function (dispatch) {
    dispatch(modifyingSprint());
    return request.post(`${baseUrl()}/ModificarPizarra`, newSprintInfo)
      .then(response => dispatch(modifySprintSuccess(response)))
      .catch(error => dispatch(modifiySprintFailure(error)));
  };
}

export function creattingSprint() {
  return {
    type: types.CREATTING_SPRINT,
    payload: {}
  };
}

export function createSprintSuccess(data) {
  return {
    type: types.CREATE_SPRINT_SUCCESS,
    sprintCreated: data
  };
}


export function createSprintFailure(error) {
  return {
    type: types.CREATE_SPRINT_FAILURE,
    payload: error
  };
}

export function createSprint(newSprintInfo) {
  return function (dispatch) {
    dispatch(creattingSprint());
    return request.post(`${baseUrl()}/altaPizarra`, newSprintInfo)
      .then(response => dispatch(createSprintSuccess(response)))
      .catch(error => dispatch(createSprintFailure(error)));
  };
}

export function delettingSprint() {
  return {
    type: types.DELETTING_SPRINT,
    payload: {}
  };
}

export function deleteSprintSuccess(data) {
  return {
    type: types.DELETE_SPRINT_SUCCESS,
    sprintDeleted: data
  };
}


export function deleteSprintFailure(error) {
  return {
    type: types.DELETE_SPRINT_FAILURE,
    payload: error
  };
}

export function deleteSprint(sprintToDelete) {
  return function (dispatch) {
    dispatch(delettingSprint());
    return request.post(`${baseUrl()}/BorrarPizarra`, sprintToDelete)
      .then(response => dispatch(deleteSprintSuccess(response)))
      .catch(error => dispatch(deleteSprintFailure(error)));
  };
}

export function checkingSprint() {
  return {
    type: types.CHECKING_SPRINT,
    payload: {}
  };
}

export function checkSprintSuccess(data) {
  return {
    type: types.CHECK_SPRINT_SUCCESS,
    sprintChecked: data
  };
}


export function checkSprintFailure(error) {
  return {
    type: types.CHECK_SPRINT_FAILURE,
    payload: error
  };
}

export function checkSprint(datesToCheck) {
  return function (dispatch) {
    dispatch(checkingSprint());
    return request.post(`${baseUrl()}/consultarPizarraCoincidentes`, datesToCheck)
      .then(response => dispatch(checkSprintSuccess(response)))
      .catch(error => dispatch(checkSprintFailure(error)));
  };
}

export function winningAward() {
  return {
    type: types.WINNING_AWARD,
    payload: {}
  };
}

export function winAwardSuccess(data) {
  return {
    type: types.WIN_AWARD_SUCCESS,
    awardWon: data
  };
}


export function winAwardFailure(error) {
  return {
    type: types.WIN_AWARD_FAILURE,
    payload: error
  };
}

export function winAward(awardToWin) {
  return function (dispatch) {
    dispatch(winningAward());
    return request.post(`${baseUrl()}/ganarLogro`, awardToWin)
      .then(response => dispatch(winAwardSuccess(response)))
      .catch(error => dispatch(winAwardFailure(error)));
  };
}
