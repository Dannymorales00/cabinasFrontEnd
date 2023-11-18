import axios from 'axios';
export default axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });
