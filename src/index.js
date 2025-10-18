import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 1) Bootstrap CSS y JS (bundle para offcanvas/tooltip/modals)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 2) estilos personalizados *después* de Bootstrap
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
