import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserAuthContext from "../Context/UserAuth/UserAuthContext";
import Loading from "./Loading";

const PrivateRoute = ({ userOnAuth, component: Component, ...rest }: any) => {
  const { user, loading } = useContext(UserAuthContext);
  let isLogin = user?.email || userOnAuth;
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Route
          {...rest}
          render={(props) =>
            isLogin ? <Component {...props} /> : <Redirect to="/" />
          }
        ></Route>
      )}
    </>
  );
};

export default PrivateRoute;
