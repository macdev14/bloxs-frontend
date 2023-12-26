import axios from "axios";

// Pode ser algum servidor executando localmente: 

const api = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers: {'Content-Type': 'application/json'}
});

export default api;