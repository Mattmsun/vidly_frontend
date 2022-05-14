import "./App.css";
import { Navbar } from "./components/Navbar";
import RouteComponent from "./components/RouteComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Category from "./components/Category";
import Movie from "./components/Movie";
import React, { useState, useEffect } from "react";
import UserMovies from "./components/UserMovies";
import { Navigate } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import About from "./components/About";

export const UserContext = React.createContext();
function App() {
  const [globalState, setGlobalState] = useState({
    phone: "",
    token: "",
    customerId: "",
    userName: "",
    customerName: "",
  });
  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    const customerId = JSON.parse(window.localStorage.getItem("customerId"));
    if (token) {
      setGlobalState({ ...globalState, token: token });
    }
    if (customerId) {
      setGlobalState({ ...globalState, customerId: customerId });
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
            <Route path="/category" element={<Category />}></Route>
            <Route path="/movie" element={<Movie />}></Route>
            <Route path="/mymovie" element={<UserMovies />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/*" element={<NoMatch />}></Route>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
