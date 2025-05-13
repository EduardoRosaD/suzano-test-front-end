// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface NewProduct extends Omit<Product, 'id'> {}

export const handlers = [
  // Manipulador para GET /api/products
  http.get<{}, undefined, Product[]>('/api/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Produto 1',
        category: 'Categoria A',
        price: 100,
        description: 'Descrição do produto 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Produto 2',
        category: 'Categoria B',
        price: 200,
        description: 'Descrição do produto 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
    ]);
  }),

  // Manipulador para POST /api/products
  http.post<{}, NewProduct, Product>('/api/products', async ({ request }) => {
    const newProduct = await request.json() as NewProduct;
    return HttpResponse.json({
      id: Date.now(),
      ...newProduct,
    });
  }),
];
