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
