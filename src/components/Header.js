import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header({ onOpenCart }) {
  const { cart } = useCart();
  const qty = cart.reduce((s,i)=>s+i.qty,0);
  const logo = "./assets/images/banner_logo_v2.png";

  return (
    <>
      {/* Banner lila */}
      <section className="banner text-center py-3">
        <div className="container position-relative">
          <img src={logo} alt="TodOKartas Logo" className="banner-logo d-block mx-auto mb-2" />
          <h2 className="mb-1 fw-800">TodOKartas</h2>
          <p className="mb-0">La mejor mano</p>

          <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
            <Link to="/login" className="btn btn-light btn-sm">Iniciar Sesión</Link>
            <Link to="/register" className="btn btn-outline-light btn-sm">Registrarse</Link>

            {/* SOLO botón: abre sidebar (no muestra carrito permanente) */}
            <button className="btn btn-dark btn-sm position-relative" onClick={onOpenCart}>
              Carrito
              {qty>0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {qty}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Navbar gris SIN enlace a Checkout */}
      <nav className="nav-bar">
        <div className="container d-flex justify-content-center gap-2 py-2">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
          {/* NO poner link a /checkout */}
        </div>
      </nav>
    </>
  );
}
