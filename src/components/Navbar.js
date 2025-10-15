import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav-bar bg-light py-2">
      <div className="container text-center">
        <Link to="/">Home</Link>
        <Link to="/products">Catálogo de productos</Link>
      </div>
    </nav>
  );
}