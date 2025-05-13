// store/productStore.ts
import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductState {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  
  fetchProducts: async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
      }
      const result = await response.json();
      console.log('Dados recebidos:', result);
  
      const data = result.products;
  
      const products = data.map((product: any) => ({
        id: product.id,
        name: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        imageUrl: product.thumbnail,
      }));
  
      console.log('Produtos formatados:', products);
      set({ products });
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  },
  

  addProduct: async (newProduct) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar produto');
      }
      const createdProduct = await response.json();
      set((state) => ({ products: [...state.products, createdProduct] }));
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  },
}));

