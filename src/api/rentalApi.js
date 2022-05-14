import axios from "axios";
const host_domain = "http://localhost:3000";
const deploy_domin = "https://lit-temple-63011.herokuapp.com";

export const rental = async (data) => {
  try {
    const response = await axios.post(`${deploy_domin}/api/rentals`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getRental = async (customerId) => {
  try {
    const response = await axios.get(
      `${deploy_domin}/api/rentals/?customerId=${customerId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
