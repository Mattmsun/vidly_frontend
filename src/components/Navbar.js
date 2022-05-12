import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UserContext } from "../App";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { globalState, setGlobalState } = useContext(UserContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();
  const routeToHome = () => {
    let path = `/`;
    navigate(path);
  };
  const routeToLogIn = () => {
    let path = `/signin`;
    navigate(path);
  };
  const routeToDashboard = () => {
    let path = `/dashboard`;
    navigate(path);
  };
  const handleLogout = () => {
    setGlobalState({ ...globalState, token: null });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("phone");

    navigate("/");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={routeToHome}
        >
          <LiveTvIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          align="left"
        >
          Vidly Movie
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={routeToDashboard}>
            Category
          </Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About</Button>
          <Button
            color="inherit"
            id="resources-button"
            onClick={handleClick}
            aria-control={open ? "resource-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Resources
          </Button>

          <Button color="inherit" onClick={routeToLogIn}>
            Sign In
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "resources-button" }}
          onClose={handleClose}
          //Popover API
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>Blog</MenuItem>
          <MenuItem onClick={handleClose}>Podcast</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
