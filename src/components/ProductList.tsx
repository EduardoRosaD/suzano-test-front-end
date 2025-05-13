'use client';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';

export default function ProductList() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !minPrice || p.price >= parseFloat(minPrice))
    .filter(p => !maxPrice || p.price <= parseFloat(maxPrice))
    .sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar pelo nome" className="p-2 border rounded" />
        <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Preço mínimo" type="number" className="p-2 border rounded" />
        <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Preço máximo" type="number" className="p-2 border rounded" />
        <button onClick={() => setSortAsc(!sortAsc)} className="p-2 bg-gray-200 rounded">
          Ordenar {sortAsc ? '▲' : '▼'}
        </button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <li key={p.id} className="p-4 border rounded">
            <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p>{p.category}</p>
            <p>R$ {p.price.toFixed(2)}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
