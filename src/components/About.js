import React from "react";
import { Box, Typography } from "@mui/material";
import "../css/styles.css";

const About = () => {
  return (
    <Box className="moviebg">
      <Typography
        sx={{ color: "black", padding: "30px", fontWeight: 600 }}
        gutterBottom
        variant="h3"
      >
        About Vidly
      </Typography>

      <Box sx={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <Typography variant="h4" align="left">
          Vidly is a movie rental platform. You can rent different genres of
          movies here
        </Typography>

        <Box sx={{ paddingTop: "100px" }}>
          <Typography variant="h4" align="left">
            Registered User have to be membership(subscribe us) and then have
            the accessiblity to rent the movie.
          </Typography>
        </Box>

        <Box sx={{ paddingTop: "100px" }}>
          <Typography variant="h4" align="left">
            Once you become our membership, you can have 10% off for every movie
            rental.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
