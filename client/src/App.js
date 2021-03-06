
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Splash from './pages/Splash/splash';
import Profile from './pages/Profile/profile';
import Exhibit from './pages/Exhibit/exhibit';
import Favorites from './pages/Favorites/favorites';
import LouVr3d from './pages/LeLouvr3d/louvr3d';
import UserContext from "../src/content/UserContext";
import Viewing from "./pages/Viewing/index";
import DepartmentSearch from "./pages/Departments/index";
import deptExhibit from "./pages/Departments/deptExhibit";
import UploadExhibit from "./pages/UploadExhibit/index";
import Concept from "./pages/Concept/index";
import Axios from "axios";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/api/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes) {
        const userRes = await Axios.get("/api/validUser",
          {
            headers: { "x-auth-token": token },
          });
        setUserData({
          token,
          user: userRes.data,
        });
        console.log(tokenRes)
        console.log(userRes)
        console.log(token)
      }
    };

    checkLoggedIn();
  }, []);

  return (
    
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
    <div className="App wrapper">
      <Switch>
      {/* <Route exact path={["/", "/users"]}/> */}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/splash" component={Splash} />
      <Route exact path="/profile" component={Profile} /> 
      <Route exact path="/search" component={Exhibit} />
      <Route exact path="/favorites" component={Favorites} />
      <Route exact path="/louvr3d" component={LouVr3d} />
      <Route exact path="/view" component={Viewing} />
      <Route exact path="/departments" component={DepartmentSearch} />
      <Route exact path="/exhibit" component={deptExhibit} />
      <Route exact path="/upload" component={UploadExhibit} />
      <Route exact path="/concept" component={Concept} />
      {/* <Route exact path="/users/:id"/>   */}
      </Switch>
     
    </div>
      </UserContext.Provider>
    </Router>
   
  );
}

export default App;
