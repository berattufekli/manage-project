import axios from "./axiosConfig";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.authorization = `Bearer: ${token}`;
  } else {
    delete axios.defaults.headers.authorization;
  }
};

export default setAuthToken;
