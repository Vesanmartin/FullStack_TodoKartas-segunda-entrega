// __tests__/filtersbar.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import FiltersBar from '../components/FiltersBar';

test('emite onChange al escribir y limpiar', () => {
  const onChange = jest.fn();
  const source = [
    { id:1, name:'Charizard', category:'Pokémon', rarity:'Rara', price:1000 },
    { id:2, name:'Psyduck',  category:'Pokémon', rarity:'Común', price:200 },
  ];

  render(<FiltersBar source={source} onChange={onChange} />);
  
  const input = screen.getByPlaceholderText(/Nombre del producto/i);
  fireEvent.change(input, { target:{ value:'char' } });

  expect(onChange).toHaveBeenCalled(); // al menos una vez
  expect(onChange.mock.calls.at(-1)[0].q).toBe('char');

  // Botón Limpiar filtros
  const btn = screen.getByRole('button', { name:/Limpiar filtros/i });
  fireEvent.click(btn);

  expect(onChange.mock.calls.at(-1)[0]).toMatchObject({
    q:'', category:'', rarity:'', min:'', max:''
  });
});
