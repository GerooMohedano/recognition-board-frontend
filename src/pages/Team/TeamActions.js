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
