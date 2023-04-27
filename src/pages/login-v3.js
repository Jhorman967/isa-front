import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppSettings } from "./../config/app-settings";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// ES6 Modules or TypeScript

import {
  handleSetAppSidebarNone,
  handleSetAppHeaderNone,
  handleSetAppContentClass,
} from "../utils/startApplication";

import axios from "axios";

export default function LoginV3() {
  const { appState, setAppState } = useContext(AppSettings);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      history.push("/dashboard");
      handleSetAppSidebarNone(false, appState, setAppState);
      handleSetAppHeaderNone(false, appState, setAppState);
      handleSetAppContentClass("", appState, setAppState);
    } else {
      handleSetAppSidebarNone(true, appState, setAppState);
      handleSetAppHeaderNone(true, appState, setAppState);
      handleSetAppContentClass("p-0", appState, setAppState);
    }
  }, []);

  const onSubmit = (event) => {
    console.log(process.env.API_BACK_URL);
    console.log(event);

    const post = { username: event.username, password: event.password };
    console.log(post);

    axios
      .post(process.env.REACT_APP_API_BACK_URL + "api/auth/signin", {
        username: event.username,
        password: event.password,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user-data", JSON.stringify(response.data));
        if (token) {
          localStorage.setItem("user-data", JSON.stringify(response.data));
          history.push("/dashboard");
          handleSetAppSidebarNone(false, appState, setAppState);
          handleSetAppHeaderNone(false, appState, setAppState);
          handleSetAppContentClass("", appState, setAppState);
        } else {
          handleSetAppSidebarNone(true, appState, setAppState);
          handleSetAppHeaderNone(true, appState, setAppState);
          handleSetAppContentClass("p-0", appState, setAppState);
        }
      })
      .catch(function (error) {
        switch (error.response.data.message) {
          case "User Not found.":
            Swal.fire({
              title: "Usuario no encontrado.",
              confirmButtonColor: "#00acac",
            });
            break;
          case "Invalid Password!":
            Swal.fire({
              title: "Contrasena invalida",
              confirmButtonColor: "#00acac",
            });
            break;
          default:
            break;
        }
        console.log(error);
      });
  };

  return (
    <div className="login login-v2 fw-bold">
      <div className="login-cover">
				<div className="login-cover-img" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)"}}></div>
				<div className="login-cover-bg"></div>
			</div>

      <div className="login-container">
        <div className="login-header">
          <div className="brand">
            <div className="d-flex align-items-center">
              <span className="logo"></span> <b>ISA {'\u00A0'}</b> Admin
            </div>
            <small>Aplicacion en gestion de ordenes </small>
          </div>
          <div className="icon">
            <i className="fa fa-lock"></i>
          </div>
        </div>
        
        <div className="login-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-20px">
              <input type="text" className="form-control fs-13px h-45px border-0" placeholder="Usuario" id="emailAddress" name="username" {...register("username")}/>
              <label htmlFor="emailAddress" className="d-flex align-items-center text-gray-600 fs-13px">Usuario</label>
            </div>
            <div className="form-floating mb-20px">
              <input type="password" className="form-control fs-13px h-45px border-0" placeholder="Contraseña" id="password" name="password" {...register("password")}/>
              <label htmlFor="emailAddress" className="d-flex align-items-center text-gray-600 fs-13px">Contraseña</label>
            </div>
            <div className="form-check mb-20px">
              <input className="form-check-input border-0" type="checkbox" value="1"  id="rememberMe" />
              <label className="form-check-label fs-13px text-gray-500" htmlFor="rememberMe">
                Recordar credenciales
              </label>
            </div>
            <div className="mb-20px">
              <button type="submit" className="btn btn-success d-block w-100 h-45px btn-lg"> Ingresar</button>
            </div>
            {/* <div className="text-gray-500">
              Not a member yet? Click <Link to="/user/register-v3">here</Link> to register.
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}


