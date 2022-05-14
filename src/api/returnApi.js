import axios from "axios";
const host_domain = "http://localhost:3000";
const deploy_domin = "https://lit-temple-63011.herokuapp.com";

// export const returnMovie = async (data, headers) => {
//   try {
//     const response = await axios.post(`${host_domain}/api/returns`, data, {
//       headers: headers,
//     });
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };

export const returnMovie = async (data, headers) => {
  try {
    const response = await axios.post(`${deploy_domin}/api/returns`, data, {
      headers: headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
