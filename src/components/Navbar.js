import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="nav-bar py-2">
      <div className="container d-flex justify-content-center gap-2">
        <NavLink to="/" end className="nav-link d-flex align-items-center gap-1">Home</NavLink>
        <NavLink to="/catalogo" className="nav-link d-flex align-items-center gap-1">Catálogo</NavLink>
        <NavLink to="/checkout" className="nav-link">Checkout</NavLink>
      </div>
    </nav>
  );
}
