import navigate from '../../services/navigate';
import { TOGGLE_NAV_DRAWER } from '../../constants/actions';

export function toggleNavDrawer(isNavDrawerOpen) {
  return {
    type: TOGGLE_NAV_DRAWER,
    isNavDrawerOpen
  };
}

export function loadRoute(route) {
  navigate(route);
  return toggleNavDrawer(false);
}
