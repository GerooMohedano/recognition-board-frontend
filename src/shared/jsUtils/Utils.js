import moment from 'moment';

function getWindowOrigin() {
  const loc = window.location;
  const port = loc.port ? `:${loc.port}` : '';
  return `${loc.protocol}//${loc.hostname}${port}`;
}

export function baseUrl() {
  const loc = window.location;
  const isHostingLocally = loc.hostname === 'localhost';
  return isHostingLocally ? 'http://localhost:3001' : getWindowOrigin();
}

export function getLocalUrl(path) {
  return `${baseUrl()}${path}`;
}

export function getLastMonthDateRange() {
  const startOfLastMonth = moment().startOf('month').subtract(1, 'months');
  const endOfLastMonth = moment().startOf('month').subtract(1, 'days');
  return `${startOfLastMonth.format('MMMM D')} - ${endOfLastMonth.format('LL')}`;
}

export function getUTCDateString(date) {
  const month = date.getUTCMonth() + 1; // zero-based
  const dayOfMonth = date.getUTCDate(); // one-based
  return `${date.getUTCFullYear()}-${month}-${dayOfMonth}`;
}

export function userInformation() {
  return window.GlobalNavConfig.UserInformation;
}
