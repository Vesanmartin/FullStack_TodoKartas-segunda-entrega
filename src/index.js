import React from 'react';
import ReactDOM from 'react-dom/client';  //modulo conecta react con el dom del navegador, react muestra componentes dentro del html.
import App from './App';   // punto de entrada logica . en app se cargan paginas rutas, etc

// 1) Bootstrap CSS y JS (bundle para offcanvas/tooltip/modals)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  //funcionen menus desplegables y otros.

// 2) estilos personalizados *después* de Bootstrap
import './styles.css';   // estilos "personalizados del css"

const root = ReactDOM.createRoot(document.getElementById('root'));  // crea la raiz de react se monta dentro del index. luego renderiza el comp app que contiene aplicacion
root.render(<App />);
