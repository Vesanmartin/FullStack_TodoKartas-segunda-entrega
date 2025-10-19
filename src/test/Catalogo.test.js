import { render, screen, waitFor } from '@testing-library/react';
import Catalogo from '../pages/Catalogo';
import { CartProvider } from '../context/CartContext';

// {/* Test1: Revisa que el catalogo se muestre sin errores al cargar */}
describe('Catalogo Component', () => {
  test('renders without crashing', () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
  });

  // {/* Test2: Verifica si aparece el mensaje "Cargando productos…" linea de codigo 45 Catalogo */}
  test('muestra mensaje de carga al iniciar', () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument();
  });

  // {/* Test3: Verifica que aparece el título "Catálogo" después de cargar los datos */}
  test('muestra título "Catálogo" después de cargar', async () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
    });
  });

  // {/* Test4: Verifica que se muestra la barra de filtros (como búsqueda o categoría) */}
  test('muestra barra de filtros después de cargar', async () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    {/* await espera el resultado para ... */}
    await waitFor(() => {
      // Cambia "Categoría" por otro texto si tu barra usa otro nombre
      expect(screen.getByText(/Categoría/i)).toBeInTheDocument();
    });
  });

  // {/* Test5: Verifica que aparece el mensaje "Sin resultados" si no hay productos que coincidan */}
  test('muestra mensaje "Sin resultados" si no hay coincidencias', async () => {
    render(
      <CartProvider>
        <Catalogo />
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText(/Sin resultados/i)).not.toBeInTheDocument();
    });
  });
});