import { ICreatteUser } from "Interfaces/ICreateUser";
import { createContext } from "react";
import { IUserAuth } from "../../Interfaces/IUserAuth";
import { IUserLogin } from "../../Interfaces/IUserLogin";

export type UserContext = {
  user: IUserAuth;
  setUser: (user: IUserAuth) => void;
  login: (user: IUserLogin) => void;
  logout: () => void;
  createUser: (user: ICreatteUser) => void;
  errorLogin: string;
  seterrorLogin: (message: string) => void;
  loading: boolean;
};

const UserAuthContext = createContext<UserContext>({
  user: {
    email: "",
    displayName: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
    victories:0,
  },
  setUser: () => {},
  errorLogin: "",
  login: () => {},
  seterrorLogin: () => {},
  createUser: () => {},
  logout: () => {},
  loading:false,
});

export default UserAuthContext;
