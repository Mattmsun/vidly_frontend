import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Typography, Box, Grid, Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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
    h3: {
      color: "white",
      fontWeight: 600,
    },
    h5: {
      color: "white",
    },
  },
});

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { globalState, setGlobalState } = useContext(UserContext);
  const userName = JSON.parse(window.localStorage.getItem("userName"));
  const customerName = JSON.parse(window.localStorage.getItem("customerName"));

  let movieData = [];
  let navigate = useNavigate();
  const routeToSignUp = () => {
    let path = `/signup`;
    navigate(path);
  };
  const routeToCategory = () => {
    let path = `/category`;
    navigate(path);
  };
  async function setCustomerId() {
    if (window.localStorage.getItem("customerId")) return;
    else await window.localStorage.setItem("customerId", JSON.stringify(""));
  }
  async function setUserName() {
    if (window.localStorage.getItem("userName")) return;
    else await window.localStorage.setItem("userName", JSON.stringify(""));
  }
  async function setCustomerName() {
    if (window.localStorage.getItem("customerName")) return;
    else await window.localStorage.setItem("customerName", JSON.stringify(""));
  }
  useEffect(() => {
    setCustomerId();
    setUserName();
    setCustomerName();
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
        //console.log(r);
        r.map((a) => movieData.push(a));

        setMovies(movieData);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  console.log("user", userName);
  console.log("customer", customerName);

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box
          className="container_1"
          sx={{ height: "600px", paddingTop: "100px" }}
        >
          <Box sx={{ marginLeft: "30px" }}>
            {userName ? (
              <Typography gutterBottom align="left" variant="h3">
                Hello, {userName}
              </Typography>
            ) : (
              <Typography gutterBottom align="left" variant="h3">
                EXPLORE THE MOST POPULAR MOVIES
              </Typography>
            )}
            {customerName ? (
              <Typography align="left" variant="h5">
                Enjoy exploring
              </Typography>
            ) : (
              <>
                <Typography align="left" variant="h5">
                  Subscribe for $7.99 AUD / Month.
                </Typography>

                <Typography align="left" variant="h5">
                  Cancel anytime.
                </Typography>

                <Typography align="left" variant="h5">
                  Join now & get 7 days FREE.
                </Typography>
              </>
            )}
            {userName && !customerName ? (
              <Grid sx={{ marginTop: "100px" }} container>
                <Grid item sx={{ marginBottom: "10px" }} xs={12}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button
                      variant="contained"
                      style={{
                        maxWidth: "400px",
                        maxHeight: "40px",
                        minWidth: "400px",
                        minHeight: "40px",
                      }}
                      onClick={routeToCategory}
                    >
                      Join Us
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : null}
            {userName ? null : (
              <Grid sx={{ marginTop: "100px" }} container>
                <Grid item sx={{ marginBottom: "10px" }} xs={12}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button
                      variant="contained"
                      style={{
                        maxWidth: "400px",
                        maxHeight: "40px",
                        minWidth: "400px",
                        minHeight: "40px",
                      }}
                      onClick={routeToSignUp}
                    >
                      SIGN UP TO START
                    </Button>
                  </Box>
                </Grid>
                <Grid item sx={{ marginBottom: "10px" }} xs={12}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{
                        maxWidth: "400px",
                        maxHeight: "40px",
                        minWidth: "400px",
                        minHeight: "40px",
                      }}
                      fullWidth
                    >
                      SIGN IN WITH PARTNER
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "black" }}>
          <ImageList cols={5} rowHeight={600}>
            {movies.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${item.Poster}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.Poster}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  loading="lazy"
                  alt={item.Title}
                />
                <ImageListItemBar title={item.Title} subtitle={item.Year} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box
          className="container_2"
          sx={{ height: "600px", paddingTop: "200px" }}
        >
          {customerName ? (
            <Typography gutterBottom align="center" variant="h3">
              ENJOY EXPLORING
            </Typography>
          ) : (
            <>
              <Typography gutterBottom align="center" variant="h3">
                EXPLORE THE MOST POPULAR MOVIES
              </Typography>

              <Typography align="center" variant="h5">
                Subscribe for $7.99 AUD / Month.
              </Typography>

              <Typography align="center" variant="h5">
                Cancel anytime.
              </Typography>
            </>
          )}

          {userName ? null : (
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
          )}
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
