import "./App.css";
import { Navbar } from "./components/Navbar";
import RouteComponent from "./components/RouteComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserInfo from "./components/UserInfo";
import Movie from "./components/Movie";
import React, { useState, useEffect } from "react";
import UserMovies from "./components/UserMovies";

export const UserContext = React.createContext();
function App() {
  const [globalState, setGlobalState] = useState({
    phone: null,
    token: null,
    customerId: null,
  });
  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    if (token) {
      setGlobalState({ ...globalState, token: token });
    }
  }, []);
  return (
    <UserContext.Provider value={{ globalState, setGlobalState }}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/signin" element={<SignIn />}></Route>

            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/userInfo" element={<UserInfo />}></Route>
            <Route path="/movie" element={<Movie />}></Route>
            <Route path="/mymovie" element={<UserMovies />}></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
