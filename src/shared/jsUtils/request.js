import axios from 'axios';

export default class Request {
  static get(url) {
    return axios.get(url);
  }

  static post(url, data = {}) {
    return axios.post(url, data);
  }

  static formDataPost(url, data = {}) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.post(url, data, config);
  }
}
