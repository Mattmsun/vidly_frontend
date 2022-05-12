import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Grid, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../css/styles.css";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ece6e6",
      contrastText: "white", //button text white instead of black
    },
  },
  typography: {
    h4: {
      color: "white",
    },
    body2: {
      color: "white",
    },
  },
});

const Home = () => {
  const [movies, setMovies] = useState([]);
  let movieData = [];
  let navigate = useNavigate();
  const routeToSignUp = () => {
    let path = `/signup`;
    navigate(path);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://movie-database-alternative.p.rapidapi.com/",
      params: { s: "movie", r: "json", page: "1" },
      headers: {
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
        "X-RapidAPI-Key": "f56572ea6cmshb1325c491fd53a6p1d4709jsn453acc2e35a7",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const r = response.data.Search;
        console.log(r);
        r.map((a) => movieData.push(a));

        setMovies(movieData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          className="container_1"
          sx={{ height: "600px", paddingTop: "150px" }}
        >
          <Typography gutterBottom align="left" variant="h4">
            EXPLORE THE MOST POPULAR MOVIES
          </Typography>

          <Typography align="left" variant="body2">
            Subscribe for $7.99 AUD / Month. FREE.
          </Typography>

          <Typography align="left" variant="body2">
            Cancel anytime.
          </Typography>

          <Typography align="left" variant="body2">
            Join now & get 7 days FREE.
          </Typography>

          <Grid sx={{ marginTop: "100px" }} container direction="column">
            <Grid sx={{ marginBottom: "10px" }} xs={4}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={routeToSignUp}
              >
                SIGN UP TO START
              </Button>
            </Grid>
            <Grid xs={4}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                fullWidth
              >
                SING IN WITH PARTNER
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ backgroundColor: "black" }}>
          <ImageList cols={5} rowHeight={600}>
            {movies.map((item) => (
              <ImageListItem key={item.Title}>
                <img
                  src={`${item.Poster}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.Poster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  alt={item.Title}
                />
                <ImageListItemBar
                  title={item.Title}
                  subtitle={item.Year}
                  // actionIcon={
                  //   <IconButton
                  //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  //     aria-label={`info about ${item.title}`}
                  //   >
                  //     <InfoIcon />
                  //   </IconButton>
                  // }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box
          className="container_2"
          sx={{ height: "600px", paddingTop: "200px" }}
        >
          <Typography gutterBottom align="center" variant="h4">
            EXPLORE THE MOST POPULAR MOVIES
          </Typography>

          <Typography align="center" variant="body2">
            Subscribe for $7.99 AUD / Month. FREE.
          </Typography>

          <Typography align="center" variant="body2">
            Cancel anytime.
          </Typography>

          <Grid
            sx={{ marginTop: "100px" }}
            container
            direction="column"
            // justifyContent="center"
            alignItems="center"
          >
            <Grid item sx={{ marginBottom: "10px" }}>
              <Button
                variant="contained"
                size="large"
                onClick={routeToSignUp}
                style={{
                  maxWidth: "400px",
                  maxHeight: "40px",
                  minWidth: "400px",
                  minHeight: "40px",
                }}
              >
                SIGN UP TO START
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                style={{
                  maxWidth: "400px",
                  maxHeight: "40px",
                  minWidth: "400px",
                  minHeight: "40px",
                }}
              >
                SING IN WITH PARTNER
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
