import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './PerfilConstants';

const INITIAL_STATE = {
  fetchingUserInfo: true,
  modifyingMail: true,
  gettingHistoricValues: true,
  gettingEveryAward: true,
  fetchError: {
    state: false,
    message: ''
  },
  fetchModifyMailError: {
    state: false,
    message: ''
  },
  getHistoricError: {
    state: false,
    message: ''
  },
  getEveryAwardError: {
    state: false,
    message: ''
  },
  userInfo: {},
  historicValues: {},
  everyAward: {}
};

const behaviors = {
  [types.FETCHING_USER_INFO](state) {
    return Object.assign({}, state, { fetchingUserInfo: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_USER_INFO_SUCCESS](state, action) {
    return Object.assign({}, state, { userInfo: action.userInfo, fetchingUserInfo: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_USER_INFO_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingUserInfo: false, fetchError: { state: true, message: action.payload } });
  },
  [types.MODIFYING_MAIL](state) {
    return Object.assign({}, state, { modifyingMail: true, fetchModifyMailError: { state: false, message: '' } });
  },
  [types.MODIFY_MAIL_SUCCESS](state, action) {
    return Object.assign({}, state, { modifyingMail: false, fetchModifyMailError: { state: false, message: '' } });
  },
  [types.MODIFY_MAIL_FAILURE](state, action) {
    return Object.assign({}, state, { modifyingMail: false, fetchModifyMailError: { state: true, message: action.payload } });
  },
  [types.GETTING_HISTORIC_VALUES](state) {
    return Object.assign({}, state, { gettingHistoricValues: true, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_SUCCESS](state, action) {
    return Object.assign({}, state, { historicValues: action.historicValues, gettingHistoricValues: false, getHistoricError: { state: false, message: '' } });
  },
  [types.GET_HISTORIC_VALUES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingHistoricValues: false, getHistoricError: { state: true, message: action.payload } });
  },
  [types.GETTING_EVERY_AWARD](state) {
    return Object.assign({}, state, { gettingEveryAward: true, getEveryAwardError: { state: false, message: '' } });
  },
  [types.GET_EVERY_AWARD_SUCCESS](state, action) {
    return Object.assign({}, state, { everyAward: action.everyAward, gettingEveryAward: false, getEveryAwardError: { state: false, message: '' } });
  },
  [types.GET_EVERY_AWARD_FAILURE](state, action) {
    return Object.assign({}, state, { gettingEveryAward: false, getEveryAwardError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
