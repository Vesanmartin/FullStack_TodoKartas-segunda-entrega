import React from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Banner />
      <Navbar />
      <div className="container mt-4">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" />
          </div>
          <button className="btn btn-primary">Ingresar</button>
        </form>
      </div>
    </>
  );
}
