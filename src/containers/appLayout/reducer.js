import { TOGGLE_NAV_DRAWER } from '../../constants/actions';

export default function (state = {}, action) {
  switch (action.type) {
    case TOGGLE_NAV_DRAWER:
      return Object.assign({}, state, { isNavDrawerOpen: action.isNavDrawerOpen });
    default:
      return state;
  }
}
