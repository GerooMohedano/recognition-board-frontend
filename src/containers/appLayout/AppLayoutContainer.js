import { connect } from 'react-redux';
import stateKeys from '../../constants/stateKeys';
import { withRouter } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import { loadRoute } from './actions';

function mapStateToProps(state) {
  return {
    isOpen: state[stateKeys.layout].isNavDrawerOpen
  };
}

export default withRouter(connect(mapStateToProps, { loadRoute })(AppLayout));
