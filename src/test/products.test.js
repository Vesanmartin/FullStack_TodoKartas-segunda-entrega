// Tests unitarios para src/services/products.js
// Buenas prácticas: nombres claros, comentarios, limpieza de timers para no ralentizar pruebas.

import { getProducts, getProductById, getMeta } from '../services/products';

describe('services/products', () => {
  // El servicio simula latencia con setTimeout; usamos fake timers para acelerar tests.
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('getProducts devuelve un array de productos después del delay simulado', async () => {
    // Llamada a la función (devuelve una promesa que se resolverá cuando avancemos timers)
    const p = getProducts();
    // Avanzar el tiempo simulado para resolver la promesa interna
    jest.advanceTimersByTime(120);
    const products = await p;

    // Afirmaciones básicas sobre la estructura de datos
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id');
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toHaveProperty('price');

    // Comprobar que cada llamada devuelve una nueva instancia de array (inmutabilidad)
    const p2 = getProducts();
    jest.advanceTimersByTime(120);
    const products2 = await p2;
    expect(products2).not.toBe(products); // distinta referencia
  });

  test('getProductById retorna el producto correcto o null si no existe', async () => {
    // Caso existente
    const pExist = getProductById('charizard-gx');
    jest.advanceTimersByTime(120);
    const prod = await pExist;
    expect(prod).not.toBeNull();
    expect(prod.id).toBe('charizard-gx');

    // Caso inexistente
    const pMiss = getProductById('id-no-existe');
    jest.advanceTimersByTime(120);
    const prodMiss = await pMiss;
    expect(prodMiss).toBeNull();
  });

  test('getMeta retorna listas únicas de categories y rarities', async () => {
    const p = getMeta();
    jest.advanceTimersByTime(120);
    const meta = await p;

    // Estructura esperada
    expect(meta).toHaveProperty('categories');
    expect(meta).toHaveProperty('rarities');
    expect(Array.isArray(meta.categories)).toBe(true);
    expect(Array.isArray(meta.rarities)).toBe(true);

    // Comprobación de unicidad en arrays
    expect(new Set(meta.categories).size).toBe(meta.categories.length);
    expect(new Set(meta.rarities).size).toBe(meta.rarities.length);

    // Al menos una categoría y una rareza están presentes en el mock
    expect(meta.categories.length).toBeGreaterThanOrEqual(1);
    expect(meta.rarities.length).toBeGreaterThanOrEqual(1);
  });
});