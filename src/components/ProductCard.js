import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import ProductCard from '../components/ProductCard'; // Asegúrate que esta ruta sea correcta

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 'charizard-gx',
    name: 'Charizard GX',
    img: '/assets/images/Charizard_GX.webp',
    price: 9990
  };

  const mockAdd = jest.fn();

  test('Renderiza sin errores', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={mockProduct} onAdd={mockAdd} />
      </MemoryRouter>
    );

    expect(screen.getByText('Charizard GX')).toBeInTheDocument();
    expect(screen.getByText('$9.990')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /detalle/i })).toHaveAttribute('href', '/producto/charizard-gx');
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  test('Llama a onAdd al hacer click en "Agregar"', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={mockProduct} onAdd={mockAdd} />
      </MemoryRouter>
    );

    const boton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(boton);

    expect(mockAdd).toHaveBeenCalledWith(mockProduct);
  });
});
