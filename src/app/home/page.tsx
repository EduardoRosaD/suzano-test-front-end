// pages/index.tsx
import ProductForm from '@/components/ProductForm';
import ProductList from '@/components/ProductList';

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Gerenciador de Produtos</h1>
      <ProductForm />
      <ProductList />
    </main>
  );
}
