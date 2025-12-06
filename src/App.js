import React from 'react';

// Solo usamos Routes, Route y useNavigate.
// El BrowserRouter está en index.js.
import {
  Routes as AppRoutes,
  Route,
  useNavigate
} from 'react-router-dom';

// Componentes principales del sitio.
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

// Páginas.
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import BlogPage from './pages/BlogPage';

// Componente que define la estructura visual principal.
function Shell() {
  // Estado que indica si el carrito lateral está abierto o cerrado.
  const [openCart, setOpenCart] = React.useState(false);

  // Hook para cambiar de página por código.
  const nav = useNavigate();

  // Se ejecuta cuando el usuario va al checkout desde el carrito.
  const handleCheckoutFromCart = () => {
    setOpenCart(false);   // cierra el carrito
    nav('/checkout');     // navega a la página de checkout
  };

  return (
    <>
      {/* Encabezado del sitio con el botón para abrir el carrito */}
      <Header onOpenCart={() => setOpenCart(true)} />

      {/* Carrito lateral */}
      <CartSidebar
        open={openCart}
        onClose={() => setOpenCart(false)}
        onCheckout={handleCheckoutFromCart}
      />

      {/* Zona central donde se muestran las páginas según la URL */}
      <main className="py-4">
        {/* Declaración de rutas de la aplicación */}
        <AppRoutes>
          {/* Página de inicio */}
          <Route path="/" element={<Home />} />

          {/* Catálogo de productos */}
          <Route path="/catalogo" element={<Catalogo />} />

          {/* Detalle de un producto */}
          <Route path="/producto/:id" element={<ProductDetail />} />

          {/* Proceso de compra / checkout */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Pantalla de inicio de sesión */}
          <Route path="/login" element={<Login />} />

          {/* Pantalla de registro de usuario */}
          <Route path="/register" element={<Register />} />

          {/* Página de blog */}
          <Route path="/blog/:blogId" element={<BlogPage />} />
        </AppRoutes>
      </main>

      {/* Pie de página */}
      <Footer />
    </>
  );
}

// Componente raíz de la aplicación.
// Los providers y el Router están en index.js.
export default function App() {
  return <Shell />;
}
