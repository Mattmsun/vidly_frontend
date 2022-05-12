import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as customerApi from "../api/customerApi";

import Dashboard from "./Dashboard";
import axios from "axios";
// axios.defaults.headers["x-auth-token"] = JSON.parse(
//   window.localStorage.getItem("token")
// );

const UserInfo = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [user, setUser] = useState({
    name: null,
    email: null,
  });
  const { globalState, setGlobalState } = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      console.log(token);
      const headers = { "x-auth-token": token };
      const res = await userApi.getMe(headers);
      setUser(res.data);
      await window.localStorage.setItem(
        "phone",
        JSON.stringify(res.data.phone)
      );
      await setGlobalState({
        ...globalState,
        phone: res.data.phone,
      });

      //   console.log(res);
    }
    getData();
  }, []);

  let navigate = useNavigate();

  return <div>{token ? <Dashboard user={user} /> : <h2>None</h2>}</div>;
};

export default UserInfo;
