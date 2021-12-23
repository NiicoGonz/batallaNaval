import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAuthContext from "../../Context/UserAuth/UserAuthContext";
import { IUserLogin } from "../../Interfaces/IUserLogin";

const FormLogin = () => {
  const { login, errorLogin ,seterrorLogin} = useContext(UserAuthContext);

  const [user, setUser] = useState<IUserLogin>({
    email: "nicolas.gonz.mart@gmail.com",
    password: "1234567",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(user);
  };

  useEffect(() => {
    seterrorLogin("")
  }, [])

  return (
    <div  className="login-container">
      <div className="form-container">

      
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-Header">
            <p>Inicio de Sesion</p>
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="text"
              placeholder="Correo"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-Group">
            <input
              className="form-Group--input"
              type="password"
              placeholder="Contraseña"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div>{errorLogin && <p>Ha ocurrido un error : {errorLogin}</p>}</div>
          <div className="form-Group">
            <button className="form-Group--button"> Iniciar sesíon</button>
          </div>
        <div className="form-register">
          <Link to="/register">
            ¿No tienes una cuenta y deseas jugar, haz click aquí?
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
