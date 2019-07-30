import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import layoutReducer from './containers/appLayout/reducer';
import perfil from './pages/Perfil/PerfilReducer'
import stateKeys from './constants/stateKeys';

const reducers = {
  [stateKeys.layout]: layoutReducer,
  perfil
};

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(ReduxThunk) // lets us dispatch() functions for async calls
);

export default store;
