import React, { useEffect, useState } from "react";
import * as api from "../api/movieApi";
import { TextField, MenuItem, Box, Typography, Grid } from "@mui/material";
import MovieGenre from "./MovieGenre";
import "../css/styles.css";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const genres = [
    "Action",
    "Crime",
    "Fantasy",
    "Horror",
    "Romance",
    "Sport",
    "Sci-fi",
    "Thriller",
    "Western",
    "War_movie",
    "Anime",
    "Slice_of_Life",
  ];
  const dailyRentalRates = ["1", "2", "all"];
  const [genre, setGenre] = useState("Action");
  const [dailyRentalRate, setDailyRentalRate] = useState("all");
  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleChangeRate = (event) => {
    setDailyRentalRate(event.target.value);
  };
  useEffect(() => {
    async function getByCategory() {
      //   const res = await api.getByGenre(genre);
      //   if (res.status === 200) {
      //     setMovies(res.data);
      //   } else alert("wrong");

      let rate = dailyRentalRate;
      if (dailyRentalRate === "all") rate = "";
      const res = await api.getMovies(genre, rate);
      if (res.status === 200) {
        setMovies(res.data);
      } else alert("wrong");
    }
    getByCategory();
  }, [genre, dailyRentalRate]);

  //   console.log(movies);
  return (
    <Box className="moviebg">
      <Typography
        sx={{ color: "black", padding: "30px" }}
        gutterBottom
        variant="h4"
      >
        Pick up your favorite movie
      </Typography>
      <Grid
        container
        sx={{ marginLeft: "20px" }}
        direction="row"
        justifyContent="flex-start"
        columns={19}
        rowSpacing={2}
        columnSpacing={2}
      >
        <Grid item xs={6}>
          <TextField
            id="genre"
            select
            label="Genre"
            value={genre}
            onChange={handleChangeGenre}
            helperText="Which kind of movie you are looking for?"
            fullWidth
            color="primary"
          >
            {genres.map((genre, index) => (
              <MenuItem key={index} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="dailyRentalRate"
            select
            label="Daily Rental Rate"
            value={dailyRentalRate}
            onChange={handleChangeRate}
            helperText="Sort the Daily rental rate"
            fullWidth
          >
            {dailyRentalRates.map((dailyRentalRate, index) => (
              <MenuItem key={index} value={dailyRentalRate}>
                {dailyRentalRate}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <MovieGenre movies={movies} />
    </Box>
  );
};

export default Movie;
