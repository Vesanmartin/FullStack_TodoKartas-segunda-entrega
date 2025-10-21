import { getProducts, getProductById, getMeta } from '../services/products';

describe('services/products', () => {
  {/* setup: simula latencia con setTimeout; usamos fake timers para acelerar tests */}
  beforeEach(() => {
    jest.useFakeTimers();
  });

  {/* cleanup: restauramos timers reales y limpiamos mocks */}
  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  {/* test 1: getProducts devuelve un array de productos después del delay simulado */}
  test('getProducts devuelve un array de productos después del delay simulado', async () => {
    const p = getProducts();
    jest.advanceTimersByTime(120);
    const productos = await p;

    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
    expect(productos[0]).toHaveProperty('id');
    expect(productos[0]).toHaveProperty('name');
    expect(productos[0]).toHaveProperty('price');

    const p2 = getProducts();
    jest.advanceTimersByTime(120);
    const productos2 = await p2;
    expect(productos2).not.toBe(productos);
  });

  {/* test 2: getProductById retorna el producto correcto o null si no existe */}
  test('getProductById retorna el producto correcto o null si no existe', async () => {
    const pExistente = getProductById('charizard-gx');
    jest.advanceTimersByTime(120);
    const producto = await pExistente;
    expect(producto).not.toBeNull();
    expect(producto.id).toBe('charizard-gx');

    const pInexistente = getProductById('id-no-existe');
    jest.advanceTimersByTime(120);
    const productoFaltante = await pInexistente;
    expect(productoFaltante).toBeNull();
  });

  {/* test 3: getMeta retorna listas únicas de categorías y rarezas */}
  test('Seretorna listas únicas de categorías y rarezas disponibles en el catálogo', async () => {
    const p = getMeta();
    jest.advanceTimersByTime(120);
    const meta = await p;

    expect(meta).toHaveProperty('categories');
    expect(meta).toHaveProperty('rarities');
    expect(Array.isArray(meta.categories)).toBe(true);
    expect(Array.isArray(meta.rarities)).toBe(true);

    expect(new Set(meta.categories).size).toBe(meta.categories.length);
    expect(new Set(meta.rarities).size).toBe(meta.rarities.length);

    expect(meta.categories.length).toBeGreaterThanOrEqual(1);
    expect(meta.rarities.length).toBeGreaterThanOrEqual(1);
  });

  {/* test 4: getProducts respeta la propiedad stock como número positivo */}
  test('getProducts respeta la propiedad stock como número positivo', async () => {
    const p = getProducts();
    jest.advanceTimersByTime(120);
    const productos = await p;

    productos.forEach(p => {
      expect(typeof p.stock).toBe('number');
      expect(p.stock).toBeGreaterThanOrEqual(0);
    });
  });

  {/* test 5: getProducts incluye imágenes con rutas válidas */}
  test('Se muestran imágenes con rutas válidas', async () => {
    const p = getProducts();
    jest.advanceTimersByTime(120);
    const productos = await p;

    productos.forEach(p => {
      expect(p.img).toMatch(/^\/assets\/images\/.*\.(webp|jpg|png)$/);
    });
  });
});