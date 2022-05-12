import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import "../css/styles.css";
import * as api from "../api/rentalApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LocalDining } from "@mui/icons-material";

const UserMovies = () => {
  const customerId = JSON.parse(window.localStorage.getItem("customerId"));

  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    async function getRentals() {
      const res = await api.getRental(customerId);
      if (res.status === 200) {
        // console.log(res);
        setRentals(res.data);
      } else alert("something wrong");
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
  //   console.log(rentals[0].movie.title);
  //   console.log(rentals[0].movie.title);
  return (
    <Box className="moviebg">
      <Typography
        sx={{ color: "black", padding: "30px" }}
        gutterBottom
        variant="h4"
      >
        Check your movies
      </Typography>
      {Array.isArray(rentals) ? (
        <Box sx={{ padding: "30px" }}>
          {rentals.map((rental, index) => {
            return (
              <Box>
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h4">{rental.movie.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container justifyContent="space-between">
                      <Grid>
                        <Typography align="left" variant="subtitle1">
                          Daily Rental Rate: {rental.movie.dailyRentalRate}
                        </Typography>
                        <Typography variant="subtitle1">
                          Rental start date: {formatDate(rental.dateOut)}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Button size="large" variant="contained">
                          Return
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
        </Box>
      ) : (
        <h1>loading...</h1>
      )}
    </Box>
  );
};

export default UserMovies;
