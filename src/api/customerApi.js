import axios from "axios";
const host_domain = "http://localhost:3000";
const deploy_domin = "https://lit-temple-63011.herokuapp.com";
export const add = async (data) => {
  try {
    const response = await axios.post(`${deploy_domin}/api/customers`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const get = async (data) => {
  try {
    const response = await axios.get(`${deploy_domin}/api/customers/${data}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
