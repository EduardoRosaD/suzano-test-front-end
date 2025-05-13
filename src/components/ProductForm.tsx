"use client";

import { SetStateAction, useState } from "react";
import { useProductStore } from "@/store/productStore";
import { ImageIcon } from "lucide-react";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@heroui/react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const addProduct = useProductStore((state) => state.addProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      category: "Outros",
      price: parseFloat(price),
      description,
      imageUrl,
    });
    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-xl border border-blue-300 bg-white transition-all hover:scale-[1.01]">
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-5 px-6 py-6">
            <Input
              label="Nome do Produto*"
              placeholder="Ex: Câmera Digital"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
              className="focus:ring-2 focus:ring-blue-500 transition"
            />

            <Input
              label="Preço (R$)*"
              placeholder="Ex: 299.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              isRequired
              className="focus:ring-2 focus:ring-blue-500 transition"
            />

            <Textarea
              label="Descrição*"
              placeholder="Descreva as características do produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
              className="focus:ring-2 focus:ring-blue-500 transition"
            />

            <Input
              label={
                <span className="flex items-center gap-2 text-sm">
                  <ImageIcon className="w-4 h-4" /> URL da Imagem
                </span>
              }
              placeholder="https://exemplo.com/imagem.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="focus:ring-2 focus:ring-blue-500 transition"
            />
          </CardBody>

          <CardFooter className="px-6 pb-6">
            <Button
              type="submit"
              color="primary"
              className="w-full rounded-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Cadastrar Produto
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
