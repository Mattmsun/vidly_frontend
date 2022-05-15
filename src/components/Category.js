import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as customerApi from "../api/customerApi";
import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import Dashboard from "./Dashboard";
import axios from "axios";
// axios.defaults.headers["x-auth-token"] = JSON.parse(
//   window.localStorage.getItem("token")
// );

const Category = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  let navigate = useNavigate();
  // const [user, setUser] = useState({
  //   name: null,
  //   email: null,
  // });
  const [user, setUser] = useState({});
  const { globalState, setGlobalState } = useContext(UserContext);
  const [openProcess, setOpenProcess] = useState(false);

  const handleToggle = () => {
    setOpenProcess(!openProcess);
  };
  const handleCloseProcess = () => {
    setOpenProcess(false);
  };
  async function setProcess() {
    await setTimeout(() => {
      handleCloseProcess();
    }, 3000);
  }
  useEffect(() => {
    handleToggle();
    setProcess();
    async function getData() {
      //console.log(token);
      const headers = { "x-auth-token": token };
      const res = await userApi.getMe(headers);
      //console.log(res);
      if (res.status === 200) {
        setUser(res.data);
        await window.localStorage.setItem(
          "phone",
          JSON.stringify(res.data.phone)
        );
        await window.localStorage.setItem(
          "userName",
          JSON.stringify(res.data.name)
        );
        await setGlobalState({
          ...globalState,
          phone: res.data.phone,
          userName: res.data.name,
        });
      }
      //console.log(user);
    }
    getData();
  }, []);

  return (
    <Box>
      {token ? (
        <Dashboard user={user} />
      ) : (
        <Typography variant="h4">Please Sign in first</Typography>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProcess}
        // onClick={handleCloseProcess}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Category;
