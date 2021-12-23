import { ICreatteUser } from "Interfaces/ICreateUser";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, firestore } from "../Firebase/config";
import { IUserAuth } from "../Interfaces/IUserAuth";
import { IUserLogin } from "../Interfaces/IUserLogin";

const useFirebaseAuthentication = () => {
  const [loading, setloading] = useState<boolean>(false)
  const initialUser: IUserAuth = {
    email: "",
    displayName: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
    victories:0,
  };
  const history = useHistory();
  const [errorLogin, seterrorLogin] = useState<string>("");
  const [userInSession, setUserInSession] = useState<IUserAuth>(initialUser);

  const login = async (user: IUserLogin) => {
    try {
      const res: any = await auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      const dataUser:any = await firestore.collection("User").doc(res.user.uid).get()
      console.log(typeof(dataUser.data().victories))
      setUserInSession({
        email: res.user.email,
        displayName: dataUser.data().userName,
        phoneNumber: dataUser.data().phoneNumber,
        photoURL: dataUser.data().photoURL,
        uid: res.user.uid,
        victories:dataUser.data().victories,
      });

      history.push("/home");
    } catch (error: any) {
      seterrorLogin(error.message);
      console.log(error.message);
    }
  };
  const createUser = async (user: ICreatteUser) => {
    try {
      const res: any = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      const createFirebaseUser = await firestore.collection("User").doc(res.user.uid).set({

        userName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        uid: res.user.uid,
        victories:user.victories,
      })
      history.push("/home");
    } catch (error: any) {
      seterrorLogin(error.message);
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUserInSession(initialUser);
      history.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };


  return {
    userInSession,
    setUserInSession,
    login,
    createUser,
    errorLogin,
    seterrorLogin,
    logout,
    loading,
    setloading,

  };
};

export default useFirebaseAuthentication;
