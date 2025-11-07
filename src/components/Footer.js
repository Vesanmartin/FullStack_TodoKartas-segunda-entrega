import React from 'react';
import '../styles.css'; 

export default function Footer(){
    return (
    <footer className="footer py-4 text-center text-muted border-top">
      
      <div className="footer__image-container">
        <img 
          src="/assets/images/Fondobanner_magic2.jpg" 
          alt="Fondo del Footer"
          className="footer__image"
        />
      </div>
      <div className="footer__content">
        <small>© 2025 TodoKartas</small>
      </div>
    </footer>
  );
}