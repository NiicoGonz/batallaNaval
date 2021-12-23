import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import UserAuthContext from "../Context/UserAuth/UserAuthContext";
import Loading from "./Loading";

const UnAuthenticatedRoute = ({ component: Component, ...rest }: any) => {
  const { user, loading } = useContext(UserAuthContext);
  let isLogin = user?.email;
  return (
    <>
      {loading ? (
       <Loading></Loading>
      ) : (
        <Route
          {...rest}
          render={(props) =>
            isLogin ? <Redirect to="/home" /> : <Component {...props} />
          }
        ></Route>
      )}
    </>
  );
};

export default UnAuthenticatedRoute;
