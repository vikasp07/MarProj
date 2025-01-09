import axios from 'axios';

// Axios instance for API calls
const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Change this to your backend's base URL
});

export default instance;
