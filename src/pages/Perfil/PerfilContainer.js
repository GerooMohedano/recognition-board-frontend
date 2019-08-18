import { connect } from 'react-redux';
import Perfil from './Perfil';
import { fetchUserInfo, modifyMail, getHistoricValues } from './PerfilAction';

function mapStateToProps(state) {
  return {
    fetchingUserInfo: state.perfil.fetchingUserInfo,
    modifyingMail: state.perfil.fetchingUserInfo,
    gettingHistoricValues: state.perfil.gettingHistoricValues,
    fetchError: state.perfil.fetchError,
    getHistoricError: state.perfil.getHistoricError,
    fetchModifyMailError: state.perfil.fetchModifyMailError,
    historicValues: state.perfil.historicValues,
    userInfo: state.perfil.userInfo
  };
}

export default connect(mapStateToProps, { fetchUserInfo, modifyMail, getHistoricValues })(Perfil);
