import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
  let navigate = useNavigate();

  async function setTime() {
    const a = await setTimeout(() => {
      navigate("/");
    }, 3000);
  }
  useEffect(() => {
    setTime();
  }, []);
  return (
    <Box>
      <Typography variant="h4">Page not found</Typography>
    </Box>
  );
};

export default NoMatch;
