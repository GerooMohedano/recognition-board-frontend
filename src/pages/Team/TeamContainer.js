import { connect } from 'react-redux';
import Team from './Team';
import {
  fetchTeams, getHistoricValues, getNotes, checkSprint,
  createNote, deleteNote, modifySprint, createSprint, deleteSprint
} from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeams: state.team.fetchingTeams,
    gettingHistoricValues: state.team.gettingHistoricValues,
    gettingNotes: state.team.gettingNotes,
    creattingNote: state.team.creattingNote,
    delettingNote: state.team.delettingNote,
    modifyingSprint: state.team.modifyingSprint,
    creattingSprint: state.team.creattingSprint,
    delettingSprint: state.team.delettingSprint,
    checkingSprint: state.team.checkingSprint,
    teamInfo: state.team.teamInfo,
    notes: state.team.notes,
    noteCreated: state.team.noteCreated,
    sprintChecked: state.team.sprintChecked,
    sprintCreated: state.team.sprintCreated,
    sprintModified: state.team.sprintModified,
    historicValues: state.team.historicValues,
    getHistoricError: state.team.getHistoricError,
    getNotesError: state.team.getNotesError,
    createNoteError: state.team.createNoteError,
    deleteNoteError: state.team.deleteNoteError,
    modifySprintError: state.team.modifySprintError,
    createSprintError: state.team.createSprintError,
    deleteSprintError: state.team.deleteSprintError,
    checkSprintError: state.team.checkSprintError,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, {
  fetchTeams, getHistoricValues, getNotes, checkSprint,
  createNote, deleteNote, modifySprint, createSprint, deleteSprint
})(Team);
