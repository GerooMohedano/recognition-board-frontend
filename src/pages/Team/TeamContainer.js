import { connect } from 'react-redux';
import Team from './Team';
import { fetchTeams, getHistoricValues, getNotes, createNote, deleteNote } from './TeamActions';

function mapStateToProps(state) {
  return {
    fetchingTeams: state.team.fetchingTeams,
    gettingHistoricValues: state.team.gettingHistoricValues,
    gettingNotes: state.team.gettingNotes,
    creattingNote: state.team.creattingNote,
    delettingNote: state.team.delettingNote,
    teamInfo: state.team.teamInfo,
    notes: state.team.notes,
    historicValues: state.team.historicValues,
    getHistoricError: state.team.getHistoricError,
    getNotesError: state.team.getNotesError,
    createNoteError: state.team.createNoteError,
    deleteNoteError: state.team.deleteNoteError,
    fetchError: state.team.fetchError
  };
}

export default connect(mapStateToProps, { fetchTeams, getHistoricValues, getNotes, createNote, deleteNote })(Team);
