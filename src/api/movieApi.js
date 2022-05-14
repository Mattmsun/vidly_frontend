import axios from "axios";
const host_domain = "http://localhost:3000";
const deploy_domin = "https://lit-temple-63011.herokuapp.com";

export const getByGenre = async (data) => {
  try {
    const response = await axios.get(`${deploy_domin}/api/movies/${data}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getMovies = async (genre, dailyRentalRate) => {
  try {
    const response = await axios.get(
      `${deploy_domin}/api/movies/?genre=${genre}&dailyRentalRate=${dailyRentalRate}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
