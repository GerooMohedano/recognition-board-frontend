import * as types from './TeamConfigConstants';
import { baseUrl } from 'shared/jsUtils/Utils';
import request from 'shared/jsUtils/request';

export function fetchingTeamConfig() {
  return {
    type: types.FETCHING_TEAMCONFIG,
    payload: {}
  };
}

export function fetchTeamConfigSuccess(data) {
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
    type: types.FETCH_TEAMCONFIG_SUCCESS,
    payload: { trends: teams }
  };
}

export function fetchTeamConfigFailure(error) {
  return {
    type: types.FETCH_TEAMCONFIG_FAILURE,
    payload: error
  };
}

export function fetchTeamConfig() {
  return function (dispatch) {
    dispatch(fetchingTeamConfig());
    return request.get(`${baseUrl()}/equipoConfig`)
      .then(response => dispatch(fetchTeamConfigSuccess(response)))
      .catch(error => dispatch(fetchTeamConfigFailure(error)));
  };
}
