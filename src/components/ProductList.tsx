'use client';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import React from "react"; 

export default function ProductList() {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [jumpPageInput, setJumpPageInput] = useState('');
  const pageSize = 4;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => !minPrice || p.price >= parseFloat(minPrice))
    .filter(p => !maxPrice || p.price <= parseFloat(maxPrice))
    .sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setJumpPageInput(''); // limpa o campo de input ao navegar
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex space-x-2">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Buscar pelo nome" className="p-2 border rounded" />
        <input value={minPrice} onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }} placeholder="Preço mínimo" type="number" className="p-2 border rounded" />
        <input value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }} placeholder="Preço máximo" type="number" className="p-2 border rounded" />
        <button onClick={() => setSortAsc(!sortAsc)} className="p-2 bg-gray-200 rounded">
          Ordenar {sortAsc ? '▲' : '▼'}
        </button>
      </div>

      {/* Lista de Produtos */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedProducts.map((p) => (
          <li key={p.id} className="p-4 border rounded">
            <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p>{p.category}</p>
            <p>R$ {p.price.toFixed(2)}</p>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>

      {/* Controles de paginação */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between items-center">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 bg-gray-200 rounded disabled:opacity-50">
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 bg-gray-200 rounded disabled:opacity-50">
            Próxima
          </button>
        </div>

        {/* Input para ir a uma página específica */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpPageInput}
            onChange={(e) => setJumpPageInput(e.target.value)}
            placeholder="Número da página"
            className="p-2 border rounded w-32"
          />
          <button
            onClick={() => goToPage(Number(jumpPageInput))}
            disabled={!jumpPageInput || Number(jumpPageInput) < 1 || Number(jumpPageInput) > totalPages}
            className="p-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Ir
          </button>
        </div>

        {/* Botões com número de páginas */}
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`p-2 border rounded ${page === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
