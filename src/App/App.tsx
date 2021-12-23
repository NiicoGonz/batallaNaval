import PrivateRoute from "Components/PrivateRoute";
import UnAuthenticatedRoute from "Components/UnAuthenticatedRoute";
import { auth } from "Firebase/config";
import Home from "Pages/Home/Home";
import Login from "Pages/Login/Login";
import Profile from "Pages/Profile/Profile";
import UsersList from "Pages/UsersList/UsersList";
import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { UserAuthProvider } from "../Context/UserAuth/UserAuthProvider";
import UserRegister from "../Pages/Register/UserRegister";
import "./App.css";



const App = () => {

  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Switch>
            <PrivateRoute  path="/home" component={Home} />
            <PrivateRoute  path="/Profile" component={Profile} />
            <PrivateRoute  path="/Players" component={UsersList} />

            <UnAuthenticatedRoute  exact path="/" component={Login} />
            <UnAuthenticatedRoute
              exact
              path="/register"
              component={UserRegister}
            />
        </Switch>
      </UserAuthProvider>
    </BrowserRouter>
  );
};

export default App;
