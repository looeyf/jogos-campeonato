import axios from 'axios';
import config from '../../config';

const api = axios.create({
  baseURL: 'https://api.api-futebol.com.br/v1/campeonatos',
});

api.defaults.headers.common['Authorization'] =
  `Bearer ${config.LIVE_KEY}`;
// 'Bearer ${config.TEST_KEY}';

export default api;
