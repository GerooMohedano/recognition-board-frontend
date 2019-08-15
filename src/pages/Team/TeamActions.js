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
