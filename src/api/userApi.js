import axios from "axios";
const host_domain = "http://localhost:3000";

export const signup = async (data) => {
  try {
    const response = await axios.post(`${host_domain}/api/users`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const signin = async (data) => {
  try {
    const response = await axios.post(`${host_domain}/api/auth`, data);
    return response;
  } catch (error) {
    return error;
  }
};
export const getMe = async (headers) => {
  try {
    const response = await axios.get(`${host_domain}/api/users/me`, {
      headers: headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};
