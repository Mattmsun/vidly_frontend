import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as customerApi from "../api/customerApi";
import { Box, Typography } from "@mui/material";
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

  useEffect(() => {
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
        await setGlobalState({
          ...globalState,
          phone: res.data.phone,
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
    </Box>
  );
};

export default Category;
