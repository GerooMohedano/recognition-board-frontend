import { connect } from 'react-redux';
import Perfil from './Perfil';
import { fetchUserInfo, modifyMail, getHistoricValues, getEveryAward } from './PerfilAction';

function mapStateToProps(state) {
  return {
    fetchingUserInfo: state.perfil.fetchingUserInfo,
    modifyingMail: state.perfil.fetchingUserInfo,
    gettingHistoricValues: state.perfil.gettingHistoricValues,
    gettingEveryAward: state.perfil.gettingEveryAward,
    fetchError: state.perfil.fetchError,
    getHistoricError: state.perfil.getHistoricError,
    fetchModifyMailError: state.perfil.fetchModifyMailError,
    getEveryAwardError: state.perfil.getEveryAwardError,
    historicValues: state.perfil.historicValues,
    userInfo: state.perfil.userInfo,
    everyAward: state.perfil.everyAward
  };
}

export default connect(mapStateToProps, { fetchUserInfo, modifyMail, getHistoricValues, getEveryAward })(Perfil);
