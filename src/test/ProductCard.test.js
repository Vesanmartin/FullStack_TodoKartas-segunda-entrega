// src/test/ProductCard.min.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

function ProductCardMin({ producto, onAdd }) {
  return (
    <div>
      <h1>{producto.name}</h1>
      <button onClick={() => onAdd(producto)}>Agregar</button>
    </div>
  );
}

describe("ProductCardMin", () => {
  const mockProduct = { id: 'x', name: 'Test', price: 100, img: '' };
  const mockAdd = jest.fn();

  test('renderiza y botón funciona', () => {
    render(<ProductCardMin producto={mockProduct} onAdd={mockAdd} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    expect(mockAdd).toHaveBeenCalledWith(mockProduct);
  });
});
