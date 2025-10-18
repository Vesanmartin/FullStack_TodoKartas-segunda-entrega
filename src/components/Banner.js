import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/banner_logo_v2.png";

export default function Banner({onOpenCart}) {
  const nav = useNavigate();

  return (
    <section className="banner position-relative text-center py-3">
      <img src={logo} alt="TodOKartas Logo" className="banner-logo" />
      <h2 className="mb-0">TodOKartas</h2>
      <h6 className="banner-subtitle">La mejor mano</h6>

      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
        <Link to="/login" className="btn btn-light btn-sm">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-outline-light btn-sm">Registrarse</Link>
        <button className="btn btn-sm btn-dark" onClick={onOpenCart}>Carrito</button>
      </div>
    </section>
  );
}
