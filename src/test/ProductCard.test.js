import ProductCard from '../components/ProductCard.js';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Componente BlogCard - Pruebas Front', ()=>{

  // Mock de producto
  const productoMock = {
    id: "charizard-gx",
    name: "Charizard GX",
    price: 9990,
    category: "Pokémon",
    rarity: "Rara",
    stock: 5,
    img: "/assets/images/Charizard_GX.webp",
    desc: "Near Mint con funda protectora."
  }

  const mockAdd = jest.fn();

  //Prueba 1: Renderizado sin errores
  test("Test 1: Componente renderiza sin errores", () => {

      render(
          <ProductCard
            producto={productoMock}
            onAdd={mockAdd}
          />
      );
  })

  //Prueba 2: Muestra Detalle en botón 
  test('Test 2: Muestra "Detalle"',()=>{
      render(
        <ProductCard
          producto={productoMock}
          onAdd={mockAdd}
        />
    );

      const titulo = screen.getByText(/Detalle/i);
      expect(titulo).toBeInTheDocument();
  });

  //Prueba 3: Estructura Card Correcta
  test('Test 3: Tiene estructura de Card de Bootstrap',()=>{
      const {container} = render(
        <ProductCard
          producto={productoMock}
          onAdd={mockAdd}
        />
      );
      const card = container.querySelector('.card');    

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('card h-100');

  })
});