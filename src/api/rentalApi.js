import axios from "axios";
const host_domain = "http://localhost:3000";

export const rental = async (data) => {
  try {
    const response = await axios.post(`${host_domain}/api/rentals`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getRental = async (customerId) => {
  try {
    const response = await axios.get(
      `${host_domain}/api/rentals/?customerId=${customerId}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
