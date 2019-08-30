import generateReducer from '../../shared/helpers/reducerHelpers';
import * as types from './TeamConstants';

const INITIAL_STATE = {
  fetchingTeams: true,
  gettingHistoricValues: true,
  gettingNotes: true,
  creattingNote: true,
  delettingNote: true,
  modifyingSprint: true,
  creattingSprint: true,
  delettingSprint: true,
  checkingSprint: true,
  checkingAwards: true,
  winningAward: true,
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
  modifySprintError: {
    state: false,
    message: ''
  },
  createSprintError: {
    state: false,
    message: ''
  },
  deleteSprintError: {
    state: false,
    message: ''
  },
  checkSprintError: {
    state: false,
    message: ''
  },
  checkAwardsError: {
    state: false,
    message: ''
  },
  winAwardError: {
    state: false,
    message: ''
  },
  historicValues: {},
  teamInfo: {},
  notes: {},
  sprintChecked: {},
  sprintCreated: {},
  sprintModified: {},
  awardsChecked: {},
  awardsWon: {},
  noteCreated: {}
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
  [types.WINNING_AWARD](state) {
    return Object.assign({}, state, { winningAward: true, winAwardError: { state: false, message: '' } });
  },
  [types.WIN_AWARD_SUCCESS](state, action) {
    return Object.assign({}, state, { awardsWon: action.awardsWon, winningAward: false, winAwardError: { state: false, message: '' } });
  },
  [types.WIN_AWARD_FAILURE](state, action) {
    return Object.assign({}, state, { winningAward: false, winAwardError: { state: true, message: action.payload } });
  },
  [types.CHECKING_AWARDS](state) {
    return Object.assign({}, state, { checkingAwards: true, checkAwardsError: { state: false, message: '' } });
  },
  [types.CHECK_AWARDS_SUCCESS](state, action) {
    return Object.assign({}, state, { awardsChecked: action.awardsChecked, checkingAwards: false, checkAwardsError: { state: false, message: '' } });
  },
  [types.CHECK_AWARDS_FAILURE](state, action) {
    return Object.assign({}, state, { checkingAwards: false, checkAwardsError: { state: true, message: action.payload } });
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
    return Object.assign({}, state, { noteCreated: action.noteCreated, creattingNote: false, createNoteError: { state: false, message: '' } });
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
  },
  [types.MODIFYING_SPRINT](state) {
    return Object.assign({}, state, { modifyingSprint: true, modifySprintError: { state: false, message: '' } });
  },
  [types.MODIFY_SPRINT_SUCCESS](state, action) {
    return Object.assign({}, state, { sprintModified: action.sprintModified, modifyingSprint: false, modifySprintError: { state: false, message: '' } });
  },
  [types.MODIFY_SPRINT_FAILURE](state, action) {
    return Object.assign({}, state, { modifyingSprint: false, modifySprintError: { state: true, message: action.payload } });
  },
  [types.CREATTING_SPRINT](state) {
    return Object.assign({}, state, { creattingSprint: true, createSprintError: { state: false, message: '' } });
  },
  [types.CREATE_SPRINT_SUCCESS](state, action) {
    return Object.assign({}, state, { sprintCreated: action.sprintCreated, creattingSprint: false, createSprintError: { state: false, message: '' } });
  },
  [types.CREATE_SPRINT_FAILURE](state, action) {
    return Object.assign({}, state, { creattingSprint: false, createSprintError: { state: true, message: action.payload } });
  },
  [types.DELETTING_SPRINT](state) {
    return Object.assign({}, state, { delettingSprint: true, deleteSprintError: { state: false, message: '' } });
  },
  [types.DELETE_SPRINT_SUCCESS](state, action) {
    return Object.assign({}, state, { delettingSprint: false, deleteSprintError: { state: false, message: '' } });
  },
  [types.DELETE_SPRINT_FAILURE](state, action) {
    return Object.assign({}, state, { delettingSprint: false, deleteSprintError: { state: true, message: action.payload } });
  },
  [types.CHECKING_SPRINT](state) {
    return Object.assign({}, state, { checkingSprint: true, checkSprintError: { state: false, message: '' } });
  },
  [types.CHECK_SPRINT_SUCCESS](state, action) {
    return Object.assign({}, state, { sprintChecked: action.sprintChecked, checkingSprint: false, checkSprintError: { state: false, message: '' } });
  },
  [types.CHECK_SPRINT_FAILURE](state, action) {
    return Object.assign({}, state, { checkingSprint: false, checkSprintError: { state: true, message: action.payload } });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);
