import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import layoutReducer from './containers/appLayout/reducer';
import perfil from './pages/Perfil/PerfilReducer';
import enterprise from './pages/Enterprise/EnterpriseReducer';
import team from './pages/Team/TeamReducer'
import teamConfig from './pages/TeamConfig/TeamConfigReducer'
import stateKeys from './constants/stateKeys';

const reducers = {
  [stateKeys.layout]: layoutReducer,
  perfil,
  enterprise,
  team,
  teamConfig
};

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(ReduxThunk) // lets us dispatch() functions for async calls
);

export default store;
