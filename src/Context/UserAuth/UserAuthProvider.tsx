import UserAuthContext from "./UserAuthContext";
import useFirebaseAuthentication from "../../hook/useFirebaseAuthentication ";
import { useEffect } from "react";
import { auth, firestore } from "../../Firebase/config";

const UserAuthProvider = (props: any) => {
  const {
    userInSession,
    setUserInSession,
    login,
    errorLogin,
    seterrorLogin,
    createUser,
    logout,
    loading,
    setloading,
  } = useFirebaseAuthentication();
  async function getNewData(user: any) {
    const dataUser: any = await firestore
      .collection("User")
      .doc(user.uid)
      .get();
    console.log(dataUser.data());
    setUserInSession({
      email: user.email,
      displayName: dataUser.data().userName,
      phoneNumber: dataUser.data().phoneNumber,
      photoURL: dataUser.data().photoUrl,
      uid: user.uid,
      victories: dataUser.data().victories,
    });
  }
  useEffect(() => {
    setloading(true);
    auth.onAuthStateChanged((user: any) => {
      try {
        console.log("Buscando el usuario");

        if (user !== null) {
          getNewData(user);
        }
        setTimeout(() => {
          setloading(false);
        }, 1000);
      } catch (e: any) {
        console.log(e);
      }
    });
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user: userInSession,
        setUser: setUserInSession,
        login,
        errorLogin,
        seterrorLogin,
        createUser,
        logout,
        loading,
      }}
    >
      {props.children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthProvider };
