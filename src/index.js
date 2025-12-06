import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Router para manejar las rutas
import { BrowserRouter } from 'react-router-dom';

// Contextos globales
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Estilos personalizados
import './styles.css';

// Creamos la raíz de React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizamos la aplicación completa
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
