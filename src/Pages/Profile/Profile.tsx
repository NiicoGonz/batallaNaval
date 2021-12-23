import UserAuthContext from "Context/UserAuth/UserAuthContext";
import { firestore } from "Firebase/config";
import { IUserAuth } from "Interfaces/IUserAuth";
import Layout from "Layout";
import React, { useContext, useEffect, useState } from "react";
import "./profile.css";

const Profile = () => {
  const { user } = useContext(UserAuthContext);
  const [datauser, setdatauser] = useState({
    userName: "",
  });
  const [userInSession, setUserInSession] = useState<IUserAuth>(user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    firestore.collection("User").doc(user.uid).update({
      userName: datauser.userName,
    });
  };

  return (
    <Layout>
      <div className="bg-1">
        <main className="container">
          <div className="card">
            <img src={user.photoURL} alt="User image" className="card__image" />
            <div className="card__text">
              <h2>{user.displayName}</h2>
            </div>
            <ul className="card__info">
              <li>
                <span className="card__info__stats">{user.victories}</span>
                <span>victories</span>
              </li>
              <li>
                <span className="card__info__stats">{user.phoneNumber}</span>
                <span>PhoneNumber</span>
              </li>
              <li>
                <span className="card__info__stats">20</span>
                <span>following</span>
              </li>
            </ul>
            <div className="card__action">
              <button className="card__action__button card__action--follow">
                edit
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
