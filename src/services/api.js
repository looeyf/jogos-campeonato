import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.api-futebol.com.br/v1/campeonatos',
});

api.defaults.headers.common['Authorization'] =
  'Bearer live_a02051125026def9af7b3f670983e5';
// 'Bearer test_1554c9a480ffc81bd0ed0200f4740f';

export default api;
