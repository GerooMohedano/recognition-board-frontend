import * as types from './TeamConstants';
import { baseUrl } from 'shared/jsUtils/Utils';
import request from 'shared/jsUtils/request';

export function fetchingTeams() {
  return {
    type: types.FETCHING_TEAMS,
    payload: {}
  };
}

export function fetchTeamsSuccess(data) {
  const teams = [];
  Object.keys(data.data).forEach(
    (team) => {
      const elem = {};
      elem.index = team;
      elem.values = data.data[team];
      jobs.push(elem);
    }
  );
  return {
    type: types.FETCH_TEAMS_SUCCESS,
    payload: { trends: teams }
  };
}

export function fetchTeamsFailure(error) {
  return {
    type: types.FETCH_TEAMS_FAILURE,
    payload: error
  };
}

export function fetchTeams() {
  return function (dispatch) {
    dispatch(fetchingTeams());
    return request.get(`${baseUrl()}/Team`)
      .then(response => dispatch(fetchTeamsSuccess(response)))
      .catch(error => dispatch(fetchTeamsFailure(error)));
  };
}
