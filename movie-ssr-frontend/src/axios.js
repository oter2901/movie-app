import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_MOVIE_API_URL,
  timeout: 1000,
});

export default instance;
