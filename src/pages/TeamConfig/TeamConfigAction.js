import * as types from './TeamConfigConstants';
import { baseUrl } from '../../shared/jsUtils/Utils';
import request from '../../shared/jsUtils/request';

export function fetchingTeamConfig() {
  return {
    type: types.FETCHING_TEAMCONFIG,
    payload: {}
  };
}

export function fetchTeamConfigSuccess(data) {
  return {
    type: types.FETCH_TEAMCONFIG_SUCCESS,
    teamConfigInfo: data
  };
}

export function fetchTeamConfigFailure(error) {
  return {
    type: types.FETCH_TEAMCONFIG_FAILURE,
    payload: error
  };
}

export function fetchTeamConfig(idEquipo) {
  return function (dispatch) {
    dispatch(fetchingTeamConfig());
    return request.get(`${baseUrl()}/equipoConfig/${idEquipo}`)
      .then(response => dispatch(fetchTeamConfigSuccess(response)))
      .catch(error => dispatch(fetchTeamConfigFailure(error)));
  };
}

export function updatingTeamName() {
  return {
    type: types.UPDATING_TEAM_NAME,
    payload: {}
  };
}

export function updateTeamNameSuccess(data) {
  return {
    type: types.UPDATE_TEAM_NAME_SUCCESS,
    teamUpdated: data
  };
}

export function updateTeamNameFailure(error) {
  return {
    type: types.UPDATE_TEAM_NAME_FAILURE,
    payload: error
  };
}

export function updateTeamName(teamInfo) {
  return function (dispatch) {
    dispatch(updatingTeamName());
    return request.post(`${baseUrl()}/modificarNombreEquipo`, teamInfo)
      .then(response => dispatch(updateTeamNameSuccess(response)))
      .catch(error => dispatch(updateTeamNameFailure(error)));
  };
}

export function updatingTeamLeader() {
  return {
    type: types.UPDATING_TEAM_LEADER,
    payload: {}
  };
}

export function updateTeamLeaderSuccess(data) {
  return {
    type: types.UPDATE_TEAM_LEADER_SUCCESS,
    teamLeaderUpdated: data
  };
}

export function updateTeamLeaderFailure(error) {
  return {
    type: types.UPDATE_TEAM_LEADER_FAILURE,
    payload: error
  };
}

export function updateTeamLeader(teamInfo) {
  return function (dispatch) {
    dispatch(updatingTeamLeader());
    return request.post(`${baseUrl()}/cambiarAdm`, teamInfo)
      .then(response => dispatch(updateTeamLeaderSuccess(response)))
      .catch(error => dispatch(updateTeamLeaderFailure(error)));
  };
}

export function delettingValue() {
  return {
    type: types.DELETTING_VALUE,
    payload: {}
  };
}

export function deleteValueSuccess(data) {
  return {
    type: types.DELETE_VALUE_SUCCESS,
    valueDeleted: data
  };
}

export function deleteValueFailure(error) {
  return {
    type: types.DELETE_VALUE_FAILURE,
    payload: error
  };
}

export function deleteValue(valueToDelete) {
  return function (dispatch) {
    dispatch(delettingValue());
    return request.post(`${baseUrl()}/borrarValor`, valueToDelete)
      .then(response => dispatch(deleteValueSuccess(response)))
      .catch(error => dispatch(deleteValueFailure(error)));
  };
}

export function activatingValue() {
  return {
    type: types.ACTIVATING_VALUE,
    payload: {}
  };
}

export function activateValueSuccess(data) {
  return {
    type: types.ACTIVATE_VALUE_SUCCESS,
    valueActivated: data
  };
}

export function activateValueFailure(error) {
  return {
    type: types.ACTIVATE_VALUE_FAILURE,
    payload: error
  };
}

export function activateValue(valueToActivate) {
  return function (dispatch) {
    dispatch(activatingValue());
    return request.post(`${baseUrl()}/activarValor`, valueToActivate)
      .then(response => dispatch(activateValueSuccess(response)))
      .catch(error => dispatch(activateValueFailure(error)));
  };
}

export function desactivatingValue() {
  return {
    type: types.DESACTIVATING_VALUE,
    payload: {}
  };
}

export function desactivateValueSuccess(data) {
  return {
    type: types.DESACTIVATE_VALUE_SUCCESS,
    valueDesactivated: data
  };
}

export function desactivateValueFailure(error) {
  return {
    type: types.DESACTIVATE_VALUE_FAILURE,
    payload: error
  };
}

export function desactivateValue(valueToDesactivate) {
  return function (dispatch) {
    dispatch(desactivatingValue());
    return request.post(`${baseUrl()}/desactivarValor`, valueToDesactivate)
      .then(response => dispatch(desactivateValueSuccess(response)))
      .catch(error => dispatch(desactivateValueFailure(error)));
  };
}

export function updatingValue() {
  return {
    type: types.UPDATING_VALUE,
    payload: {}
  };
}

export function updateValueSuccess(data) {
  return {
    type: types.UPDATE_VALUE_SUCCESS,
    valueUpdated: data
  };
}

export function updateValueFailure(error) {
  return {
    type: types.UPDATE_VALUE_FAILURE,
    payload: error
  };
}

export function updateValue(valueToUpdate) {
  return function (dispatch) {
    dispatch(updatingValue());
    return request.post(`${baseUrl()}/modificarValor`, valueToUpdate)
      .then(response => dispatch(updateValueSuccess(response)))
      .catch(error => dispatch(updateValueFailure(error)));
  };
}

export function addingValue() {
  return {
    type: types.ADDING_VALUE,
    payload: {}
  };
}

export function addValueSuccess(data) {
  return {
    type: types.ADD_VALUE_SUCCESS,
    valueAdded: data
  };
}

export function addValueFailure(error) {
  return {
    type: types.ADD_VALUE_FAILURE,
    payload: error
  };
}

export function addValue(valueToAdd) {
  return function (dispatch) {
    dispatch(addingValue());
    return request.post(`${baseUrl()}/altaValor`, valueToAdd)
      .then(response => dispatch(addValueSuccess(response)))
      .catch(error => dispatch(addValueFailure(error)));
  };
}
