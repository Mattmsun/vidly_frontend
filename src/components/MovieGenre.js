import React, { useEffect, useState } from "react";
import {
  CardMedia,
  Box,
  Typography,
  CardContent,
  Button,
  CardActionArea,
  CardActions,
  Card,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as api from "../api/rentalApi";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MovieGenre = (props) => {
  const { movies } = props;
  const [open, setOpen] = useState(false);
  const [openSuAlert, setOpenSuAllert] = useState(false);
  const [openFailAlert, setOpenFailAllert] = useState(false);

  const [genreImages, setGenreImages] = useState([]);
  const customerId = JSON.parse(window.localStorage.getItem("customerId"));
  const [movieId, setMovieId] = useState("");

  //Open and close success alert
  const handleSuccessOpen = () => {
    setOpenSuAllert(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuAllert(false);
  };
  // Open and close fail alert
  const handleFailOpen = () => {
    setOpenFailAllert(true);
  };

  const handleFailClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailAllert(false);
  };

  const handleClickOpen = (e) => {
    const data = e.target.value;
    setMovieId(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePay = async () => {
    let data = { customerId: customerId, movieId: movieId };
    console.log(data);
    const res = await api.rental(data);
    console.log(res);
    if (res.status === 200) {
      handleClose();
      handleSuccessOpen();
    } else {
      handleClose();
      handleFailOpen();
    }
  };
  // import all pictures
  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const actionImages = importAll(
    require.context("../movie_image/action", false, /\.(png|jpe?g|svg)$/)
  );
  const crimeImages = importAll(
    require.context("../movie_image/crime", false, /\.(png|jpe?g|svg)$/)
  );
  const fantasyImages = importAll(
    require.context("../movie_image/fantasy", false, /\.(png|jpe?g|svg)$/)
  );
  const horrorImages = importAll(
    require.context("../movie_image/horror", false, /\.(png|jpe?g|svg)$/)
  );
  const romanceImages = importAll(
    require.context("../movie_image/romance", false, /\.(png|jpe?g|svg)$/)
  );
  const sportImages = importAll(
    require.context("../movie_image/sport", false, /\.(png|jpe?g|svg)$/)
  );
  const sci_fiImages = importAll(
    require.context("../movie_image/sci-fi", false, /\.(png|jpe?g|svg)$/)
  );
  const thrillerImages = importAll(
    require.context("../movie_image/thriller", false, /\.(png|jpe?g|svg)$/)
  );
  const westernImages = importAll(
    require.context("../movie_image/western", false, /\.(png|jpe?g|svg)$/)
  );
  const lifeImages = importAll(
    require.context("../movie_image/life", false, /\.(png|jpe?g|svg)$/)
  );
  const warImages = importAll(
    require.context("../movie_image/war", false, /\.(png|jpe?g|svg)$/)
  );
  const animeImages = importAll(
    require.context("../movie_image/anime", false, /\.(png|jpe?g|svg)$/)
  );
  useEffect(() => {
    function setGenre() {
      console.log(movies);

      if (movies[0]) {
        switch (movies[0].genre.name) {
          case "Action":
            setGenreImages(actionImages);
            break;
          case "Crime":
            setGenreImages(crimeImages);
            break;
          case "Fantasy":
            setGenreImages(fantasyImages);
            break;
          case "Horror":
            setGenreImages(horrorImages);
            break;
          case "Romance":
            setGenreImages(romanceImages);
            break;
          case "Sport":
            setGenreImages(sportImages);
            break;
          case "Sci-fi":
            setGenreImages(sci_fiImages);
            break;
          case "Thriller":
            setGenreImages(thrillerImages);
            break;
          case "Western":
            setGenreImages(westernImages);
            break;
          case "War_movie":
            setGenreImages(warImages);
            break;
          case "Anime":
            setGenreImages(animeImages);
            break;
          case "Slice_of_Life":
            setGenreImages(lifeImages);
            break;
          default:
            setGenreImages(actionImages);
        }
      }
    }
    setGenre();
  }, [movies]);

  return (
    <Box sx={{}}>
      <Grid
        sx={{ marginLeft: "20px" }}
        container
        direction="row"
        justifyContent="flex-start"
        columns={19}
        rowSpacing={2}
        columnSpacing={2}
        // alignItems="center"
      >
        {movies.map((movie, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                maxWidth: "100%",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  //   src={animeImages[`${movie.title.replace(":", "-")}.jpeg`]}
                  src={genreImages[`${movie.title.replace(":", "-")}.jpeg`]}
                  alt="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    Daily Rental Rate: ${movie.dailyRentalRate}/day
                  </Typography>
                  <Typography variant="subtitle1">
                    In Stock: {movie.numberInStock}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button
                  value={movie._id}
                  onClick={(e) => handleClickOpen(e, "value")}
                  size="small"
                  color="primary"
                >
                  Take
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Rent the movie?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can return the movie at any time. Once you click "pay", you will
            agree with our terms and condition, and money will be deducted from
            your account aotumatically.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePay} autoFocus>
            Pay
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSuAlert}
        autoHideDuration={5000}
        onClose={handleSuccessClose}
      >
        <Alert
          onClose={handleSuccessClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thanks for supporting us. Check your movie out!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openFailAlert}
        autoHideDuration={5000}
        onClose={handleFailClose}
      >
        <Alert
          onClose={handleFailClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          "Whoops! Something wrong"
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MovieGenre;
