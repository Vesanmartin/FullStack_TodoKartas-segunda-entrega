import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenCart }) {
  const { cart } = useCart();
  const qty = cart.reduce((s,i)=>s+i.qty,0);
  const { user , logout } = useAuth(); //obtiene usuario actual
  const logo = "./assets/images/LogoTodoKartasReload.png";
  const bannerBg = `linear-gradient(90deg, rgba(38,0,77,.55), rgba(0,0,0,.55)),
  url(${process.env.PUBLIC_URL}/assets/images/Fondobanner_magic2.jpg)`;

  return (
    <>
      {/* Banner con imagen + logo a la izquierda */}
      <section
        className="banner"
        style={{ background: `${bannerBg} center/cover no-repeat` }}
      >
        <div className="container d-flex justify-content-between align-items-center py-3">
          {/* Logo + marca */}
          <Link to="/" className="d-flex align-items-center gap-3 text-white text-decoration-none">
            <img src={logo} alt="TodOKartas" className="banner-logo" />
            <div className="d-none d-md-block">
              <h2 className="fw-800 mb-0"></h2>
              <small className="opacity-75"></small>
            </div>
          </Link>

            {/* Acciones */}
            <div className="d-flex flex-column align-items-end">
              {/* Muestra el nombre de usuario arriba de los botones */}
              {user && (
                <div className="text-white fs-5 mb-3">
                  Bienvenido, <strong>{user.name}</strong>
                </div>
              )}

              <div className="d-flex gap-2">
                {!user ? (
                  <>
                    <Link to="/login" className="btn btn-light btn-sm rounded-pill">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="btn btn-outline-light btn-sm rounded-pill">
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <button
                    className="btn btn-light btn-sm rounded-pill"
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </button>
                )}

            <button className="btn btn-dark btn-sm rounded-pill position-relative" onClick={onOpenCart}>
              Carrito
              {qty>0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {qty}
                </span>
              )}
            </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar debajo del banner */}
      <nav className="nav-bar">
        <div className="container d-flex justify-content-center gap-2 py-2">
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/catalogo" className="nav-link">Catálogo</NavLink>
        </div>
      </nav>
    </>
  );
}

