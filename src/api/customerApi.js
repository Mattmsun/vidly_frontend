import axios from "axios";
const host_domain = "http://localhost:3000";

export const add = async (data) => {
  try {
    const response = await axios.post(`${host_domain}/api/customers`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const get = async (data) => {
  try {
    const response = await axios.get(`${host_domain}/api/customers/${data}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
