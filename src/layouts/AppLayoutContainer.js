import { connect } from 'react-redux';
import AppLayout from './AppLayout';
import { fetchGeneralUserInfo, createEnterprise } from './AppLayoutActions';

function mapStateToProps(state) {
  return {
    fetchingGeneralUserInfo: state.appLayout.fetchingGeneralUserInfo,
    creattingEnterprise: state.appLayout.creattingEnterprise,
    userInfo: state.appLayout.userInfo,
    enterpriseCreated: state.appLayout.enterpriseCreated,
    fetchError: state.appLayout.fetchError
  };
}

export default connect(mapStateToProps, { fetchGeneralUserInfo, createEnterprise })(AppLayout);
