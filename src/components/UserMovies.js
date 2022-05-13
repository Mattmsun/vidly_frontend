import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import {
  Grid,
  Snackbar,
  Button,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "../css/styles.css";
import * as rentalApi from "../api/rentalApi";
import * as returnApi from "../api/returnApi";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UserMovies = () => {
  let navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(UserContext);
  const customerId = JSON.parse(window.localStorage.getItem("customerId"));
  const { token } = globalState;

  // const { token, customerId } = globalState;

  const [open, setOpen] = useState(false);
  const [openFailAlert, setOpenFailAllert] = useState(false);
  const [openSuAlert, setOpenSuAllert] = useState(false);
  const [movieId, setMovieId] = useState("");

  const [rentals, setRentals] = useState([]);
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
  async function loadRefreshContent() {
    await setTimeout(() => window.location.reload(false), 3000);
  }
  const handleReturn = async () => {
    let data = { customerId: customerId, movieId: movieId };
    const headers = { "x-auth-token": token };
    const res = await returnApi.returnMovie(data, headers);
    console.log(res);
    if (res.status === 200) {
      handleClose();
      handleSuccessOpen();
    } else {
      handleClose();
      handleFailOpen();
    }
    loadRefreshContent();
  };
  const handleBackMovie = () => {
    navigate("/movie");
  };
  useEffect(() => {
    async function getRentals() {
      const res = await rentalApi.getRental(customerId);
      if (res.status === 200) {
        // console.log(res);
        setRentals(res.data);
      }
      // else alert("something wrong");
    }
    getRentals();
  }, []);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  if (customerId) {
    return (
      <Box className="moviebg">
        <Typography
          sx={{ color: "black", padding: "30px" }}
          gutterBottom
          variant="h4"
        >
          Rent History
        </Typography>
        {Array.isArray(rentals) ? (
          <Box sx={{ paddingLeft: "100px", paddingRight: "100px" }}>
            {/* borrowed movies */}
            <Box>
              <Typography variant="h4" align="left">
                Borrowed Movies
              </Typography>
              {rentals.map((rental, index) => {
                if (!rental.dateReturned) {
                  return (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h4">
                          {rental.movie.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container justifyContent="space-between">
                          <Grid item xs={10}>
                            <Typography align="left" variant="subtitle1">
                              Daily Rental Fee: {rental.movie.dailyRentalRate}
                            </Typography>
                            <Typography align="left" variant="subtitle1">
                              Rental start date: {formatDate(rental.dateOut)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button size="large" variant="contained">
                              Play
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              size="large"
                              variant="contained"
                              value={rental.movie._id}
                              onClick={(e) => handleClickOpen(e, "value")}
                            >
                              Return
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}
            </Box>
            {/* returned movies */}
            <Box sx={{ marginTop: "200px" }}>
              <Typography variant="h4" align="left">
                Returned Movies
              </Typography>
              {rentals.map((rental, index) => {
                if (rental.dateReturned) {
                  return (
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography variant="h4">
                          {rental.movie.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container justifyContent="space-between">
                          <Grid>
                            <Typography align="left" variant="subtitle1">
                              Daily Rental Fee: {rental.movie.dailyRentalRate}
                            </Typography>
                            <Typography variant="subtitle1">
                              Rental start date: {formatDate(rental.dateOut)}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Typography align="left" variant="subtitle1">
                              Total Rental Fee: {rental.rentalFee}
                              <Tooltip
                                placement="top"
                                title="Fee can be 0 when the rent duration is less than 1 day"
                              >
                                <IconButton
                                  size="small"
                                  color="primary"
                                  disableFocusRipple
                                  disableRipple
                                  sx={{ paddingTop: "0", paddingBottom: "4px" }}
                                >
                                  <ErrorOutlineIcon />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                            <Typography variant="subtitle1">
                              Rental start date:{" "}
                              {formatDate(rental.dateReturned)}
                            </Typography>
                          </Grid>
                          <Grid>
                            <Button
                              size="large"
                              variant="contained"
                              onClick={handleBackMovie}
                            >
                              Rent Again
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  );
                }
              })}
            </Box>
          </Box>
        ) : (
          <h1>loading...</h1>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Return the movie?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your rental fee was counted when you rent the movie. By clicking
              "RETURN" button, you will return the movie automatically.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleReturn} autoFocus>
              Return
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
            You have been returned your movie successfully
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
  } else {
    return (
      <Box>
        <Typography variant="h4">
          Only our cutomers have access to history
        </Typography>
      </Box>
    );
  }
};

export default UserMovies;
