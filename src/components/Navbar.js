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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const customerId = JSON.parse(window.localStorage.getItem("customerId"));
  const token = JSON.parse(window.localStorage.getItem("token"));

  const { globalState, setGlobalState } = useContext(UserContext);
  // const { customerId } = globalState;
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
  const routeToCategory = () => {
    let path = `/category`;
    navigate(path);
  };
  const routeToMyHistory = () => {
    let path = `/mymovie`;
    navigate(path);
  };
  const routeToMovies = () => {
    let path = `/movie`;
    navigate(path);
  };
  // console.log(customerId);
  const handleLogout = () => {
    handleClose();
    setGlobalState({ ...globalState, token: null });
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("phone");
    window.localStorage.removeItem("customerId");
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
          sx={{ paddingTop: "8px" }}
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
        {token ? (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={routeToCategory}>
              Category
            </Button>
            {customerId ? (
              <>
                <Button color="inherit" onClick={routeToMovies}>
                  Movies
                </Button>
                <Button color="inherit" onClick={routeToMyHistory}>
                  History
                </Button>
              </>
            ) : null}

            <IconButton
              color="inherit"
              id="resources-button"
              onClick={handleClick}
              aria-control={open ? "resource-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleIcon />
            </IconButton>
            {/* <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button> */}
          </Stack>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={routeToLogIn}>
              Sign In
            </Button>
          </Stack>
        )}

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
          <MenuItem onClick={handleClose}>Portfolio</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
