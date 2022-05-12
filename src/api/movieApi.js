import axios from "axios";
const host_domain = "http://localhost:3000";
export const getByGenre = async (data) => {
  try {
    const response = await axios.get(`${host_domain}/api/movies/${data}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getMovies = async (genre, dailyRentalRate) => {
  try {
    const response = await axios.get(
      `${host_domain}/api/movies/?genre=${genre}&dailyRentalRate=${dailyRentalRate}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
