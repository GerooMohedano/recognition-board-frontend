import axios from 'axios';

export default class Request {
  static get(url) {
    return axios.get(url);
  }

  static post(url, data = {}) {
    return axios.post(url, data);
  }
}
