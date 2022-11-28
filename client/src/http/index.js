import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/';
// const frontURL =
//   process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000/';

const $host = axios.create({
  baseURL,
});
const $authHost = axios.create({
  baseURL,
});
// const authInterceptor = (config) => {
//   config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// };
// $authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost, baseURL };
