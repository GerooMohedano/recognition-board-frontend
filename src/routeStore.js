import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import perfil from './pages/Perfil/PerfilReducer';
import enterprise from './pages/Enterprise/EnterpriseReducer';
import team from './pages/Team/TeamReducer';
import teamConfig from './pages/TeamConfig/TeamConfigReducer';
import appLayout from './layouts/AppLayoutReducer';

const reducers = {
  perfil,
  enterprise,
  team,
  teamConfig,
  appLayout
};

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(ReduxThunk) // lets us dispatch() functions for async calls
);

export default store;
