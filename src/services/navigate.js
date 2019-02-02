import { createBrowserHistory } from 'history';

export default function (route) {
  const history = createBrowserHistory();
  history.push(route);
}
