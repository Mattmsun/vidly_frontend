import axios from "axios";
const host_domain = "http://localhost:3000";
const deploy_domin = "https://lit-temple-63011.herokuapp.com";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${deploy_domin}/api/users`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const signin = async (data) => {
  try {
    const response = await axios.post(`${deploy_domin}/api/auth`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const getMe = async (headers) => {
  try {
    const response = await axios.get(`${deploy_domin}/api/users/me`, {
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
