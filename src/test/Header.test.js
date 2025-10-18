import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  
  //Header Renderiza?
  test('renders without crashing', () => {
    render(<Header />);
  });

  // Test para título principal "TodOKartas"
  test('displays main title "TodOKartas"', () => {
    render(<Header />);
    const title = screen.getByText(/TodOKartas/i);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  // Test para el subtítulo "La mejor mano"
  test('displays subtitle "La mejor mano"', () => {
    render(<Header />);
    const subtitle = screen.getByText(/La mejor mano/i);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass('banner-subtitle');
  });

  // Se Muestra la imagen del logo?
  test('renders logo image with correct src and alt', () => {
    render(<Header />);
    const logo = screen.getByAltText('TodOKartas Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/assets/images/banner_logo_v2.png');
    expect(logo).toHaveClass('banner-logo');
  });

  // Se Muestran los 3 botones con texto e íconos esperados
  test('renders all three action buttons with correct text', () => {
    render(<Header />);
    
    // Botón de Iniciar Sesión
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    
    // Botón de Registro
    expect(screen.getByText(/Registro/i)).toBeInTheDocument();
    
    // Botón de Carrito
    expect(screen.getByText(/carrito/i)).toBeInTheDocument();
    
    // Verifica que hay 3 botones en total
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });
});