import React from "react";
import { Link } from "react-router-dom";
import logo from ".banner_logo_v2.png";

export default function Banner() {
  return (
    <section className="banner position-relative text-center py-3">
      <img src={logo} alt="TodOKartas Logo" className="banner-logo" />
      <h2>TodOKartas</h2>
      <h3 className="banner-subtitle">La mejor mano</h3>
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
        <Link to="/login" className="btn btn-primary btn-sm">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-outline-secondary btn-sm">Registrarse</Link>
        <Link to="/checkout" className="btn btn-sm btn-cart btn-outline-dark">Carrito</Link>
      </div>
    </section>
  );
}
