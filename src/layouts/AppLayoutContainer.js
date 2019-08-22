import { connect } from 'react-redux';
import AppLayout from './AppLayout';
import { fetchGeneralUserInfo } from './AppLayoutActions';

function mapStateToProps(state) {
  return {
    fetchingGeneralUserInfo: state.appLayout.fetchingGeneralUserInfo,
    userInfo: state.appLayout.userInfo,
    fetchError: state.appLayout.fetchError
  };
}

export default connect(mapStateToProps, { fetchGeneralUserInfo })(AppLayout);
