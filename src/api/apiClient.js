import axios from "axios";

const api = axios.create({
  baseURL: sessionStorage.getItem('api-url')
});

export default api;
