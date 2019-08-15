import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConstants';

const INITIAL_STATE = {
  fetchingTeams: true,
  gettingHistoricValues: true,
  gettingNotes: true,
  creattingNote: true,
  delettingNote: true,
  fetchError: {
    state: false,
    message: ''
  },
  getHistoricError: {
    state: false,
    message: ''
  },
  getNotesError: {
    state: false,
    message: ''
  },
  createNoteError: {
    state: false,
    message: ''
  },
  deleteNoteError: {
    state: false,
    message: ''
  },
  historicValues: {},
  teamInfo: {},
  notes: {}
};

const behaviors = {
  [types.FETCHING_TEAMS](state) {
    return Object.assign({}, state, { fetchingTeams: true, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMS_SUCCESS](state, action) {
    return Object.assign({}, state, { teamInfo: action.teamInfo, fetchingTeams: false, fetchError: { state: false, message: '' } });
  },
  [types.FETCH_TEAMS_FAILURE](state, action) {
    return Object.assign({}, state, { fetchingTeams: false, fetchError: { state: true, message: action.payload } });
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
  [types.GETTING_NOTES](state) {
    return Object.assign({}, state, { gettingNotes: true, getNotesError: { state: false, message: '' } });
  },
  [types.GET_NOTES_SUCCESS](state, action) {
    return Object.assign({}, state, { notes: action.notes, gettingNotes: false, getNotesError: { state: false, message: '' } });
  },
  [types.GET_NOTES_FAILURE](state, action) {
    return Object.assign({}, state, { gettingNotes: false, getNotesError: { state: true, message: action.payload } });
  },
  [types.CREATING_NOTE](state) {
    return Object.assign({}, state, { creattingNote: true, createNoteError: { state: false, message: '' } });
  },
  [types.CREATE_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, { creattingNote: false, createNoteError: { state: false, message: '' } });
  },
  [types.CREATE_NOTE_FAILURE](state, action) {
    return Object.assign({}, state, { creattingNote: false, createNoteError: { state: true, message: action.payload } });
  },
  [types.DELETTING_NOTE](state) {
    return Object.assign({}, state, { delettingNote: true, deleteNoteError: { state: false, message: '' } });
  },
  [types.DELETE_NOTE_SUCCESS](state, action) {
    return Object.assign({}, state, { delettingNote: false, deleteNoteError: { state: false, message: '' } });
  },
  [types.DELETE_NOTE_FAILURE](state, action) {
    return Object.assign({}, state, { delettingNote: false, deleteNoteError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
