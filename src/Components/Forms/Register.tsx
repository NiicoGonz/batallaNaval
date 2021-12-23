import { ICreatteUser } from "Interfaces/ICreateUser";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAuthContext from "../../Context/UserAuth/UserAuthContext";
import { IUserLogin } from "../../Interfaces/IUserLogin";

const Register = () => {
  const { createUser, errorLogin, seterrorLogin } = useContext(UserAuthContext);
  const [userRegister, setUserRegister] = useState<ICreatteUser>({
    email: "",
    password: "",
    displayName: "" ,
    photoURL: "" ,
    uid: "",
    phoneNumber: "" ,
    victories:0 ,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createUser(userRegister);
  };

  useEffect(() => {
    seterrorLogin("");
  }, []);
  return (
    <div className="register-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-Header">Registro de Usuario</div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="text"
              placeholder="UserName"
              value={userRegister.displayName}
              onChange={(e) =>
                setUserRegister({ ...userRegister, displayName: e.target.value })
              }
            />
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="text"
              placeholder="paste a url img"
              value={userRegister.photoURL}
              onChange={(e) =>
                setUserRegister({ ...userRegister, photoURL: e.target.value })
              }
            />
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="text"
              placeholder="PhoneNumber"
              value={userRegister.phoneNumber}
              onChange={(e) =>
                setUserRegister({ ...userRegister, phoneNumber: e.target.value })
              }
            />
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="text"
              placeholder="Correo"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister({ ...userRegister, email: e.target.value })
              }
            />
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="password"
              placeholder="Contraseña"
              value={userRegister.password}
              onChange={(e) =>
                setUserRegister({ ...userRegister, password: e.target.value })
              }
            />
          </div>
      
          <div>{errorLogin && <p>Ha ocurrido un error : {errorLogin}</p>}</div>
          <div className="form-Group">
            <button className="form-Group--button">Registrarme</button>
          </div>
          <div className="form-register">
            <Link to="/">!Ya tengo una cuenta!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
