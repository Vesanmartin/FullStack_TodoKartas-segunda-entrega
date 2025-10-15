import React from "react";

function Header() {
  return (
    <section className="banner position-relative"
    style={{backgroundColor: '#4c3893ff'}}>
      <div className="container text-center">
        {/* Logo y subtítulo centrados */}
        <img
          src="/assets/images/banner_logo_v2.png"
          alt="TodOKartas Logo"
          className="banner-logo"
          style={{ maxWidth: '200px', margin: '0 auto 1rem' }}
        />
        <h2>TodOKartas</h2>
        <h3 className="banner-subtitle">La mejor mano</h3>

        {/* Botones de Login, Registro e ícono de carrito */}
        <div className="icon-links-top mt-3">
          <button type="button" className="btn btn-primary btn-sm me-2" id="btn-login">
            <i className="bi bi-person"></i> Iniciar Sesión
          </button>

          <button type="button" className="btn btn-primary btn-sm me-2" id="btn-login">
            <i className="bi bi-person"></i> Registro 
          </button>

          <button type="button" className="btn btn-primary btn-sm me-2" id="btn-login">
            <i className="bi bi-cart"></i> carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header;