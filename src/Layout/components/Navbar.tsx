import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserAuthContext from "../../Context/UserAuth/UserAuthContext";
import "./Navbar.css"

const Navbar = () => {
  const { logout, user } = useContext(UserAuthContext);

  return (
    <div className="Navbar">
      <div className="navbar-container">
        <p>Bievenido : {user.email}</p>
        <Link className="nav-link" to="/Profile" >
          profile
          </Link>
          <Link className="nav-link" to="/Players" >
          Players
          </Link>
        <button className="button" onClick={logout}>
          
          <span >Cerrar sesion</span></button>
      
        
      </div>
    </div>
  );
};

export default Navbar;
