import CheckoutForm from '../components/CheckoutForm';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
    
    // Mock hooks, se definen las funciones mock de useNavigate y useCart
    jest.mock("react-router-dom", () => ({
      useNavigate: jest.fn(),
    }));
    
    jest.mock("../context/CartContext", () => ({
      useCart: jest.fn(),
    }));

    
    
    describe('Componente CheckoutForm - Pruebas Front', () => {
        
      test("Test 1: Componente renderiza sin errores", () => {
          // Mock de función useCart
          useCart.mockReturnValue({
            cart: [],
            total: 0,
            add: jest.fn(),
            sub: jest.fn(),
            remove: jest.fn(),
          });
    
          // Mock de función useNavigate
          const mockNavigate = jest.fn();
          useNavigate.mockReturnValue(mockNavigate);
    
          render(<CheckoutForm />);
  })

  //Prueba 2: Muestra Detalle en botón 
  test('Test 2: Muestra "Detalle"',()=>{
        // Mock de función useCart
        useCart.mockReturnValue({
            cart: [],
            total: 0,
            add: jest.fn(),
            sub: jest.fn(),
            remove: jest.fn(),
          });
    
        // Mock de función useNavigate
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
    
        render(<CheckoutForm />);

      const titulo = screen.getByText(/Pagar ahora/i);
      expect(titulo).toBeInTheDocument();
  });

  //Prueba 3: Estructura Card Correcta
  test('Test 3: Tiene estructura principal de CheckoutForm', () => {
    // Mock de función useCart
    useCart.mockReturnValue({
      cart: [],
      total: 0,
      add: jest.fn(),
      sub: jest.fn(),
      remove: jest.fn(),
    });
  
    // Mock de función useNavigate
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  
    const { container } = render(<CheckoutForm />);
  
    // Buscam la primera card principal
    const mainCard = container.querySelector('.card.flex-grow-1');
  
    expect(mainCard).toBeInTheDocument();
    expect(mainCard).toHaveClass('card', 'flex-grow-1');
  
  });
});



