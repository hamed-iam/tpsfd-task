"use client";

import { ChangeEvent, useMemo, useState } from "react";

import { debounce } from "@/utils/debounce";
import { Input } from "@/components/ui/input";
import AddItemForm from "@/components/AddItemForm";
import DeleteButton from "@/components/DeleteButton";
import ShoppingItem from "@/components/ShoppingItem";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import data from "@/data/products.json";

type Product = {
  id: string;
  title: string;
  description: string;
  base64Image: string;
  price: number;
  strikePrice: number;
  checked: boolean;
};

type NewProduct = Omit<Product, "id">;

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(
    data.products.map((item) => ({ ...item, checked: false })),
  );

  const addItem = (title: string) => {
    const newItem: NewProduct = {
      title,
      checked: false,
      base64Image: "",
      price: 0,
      strikePrice: 0,
      description: "",
    };

    setItems((prev) => [...prev, { ...newItem, id: Date.now().toString() }]);
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const deleteChecked = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  const debouncedSetSearchQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 300),
    [setSearchQuery],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Shopping List</h1>
        <DarkModeToggle />
        <DeleteButton onDelete={deleteChecked} />
      </header>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for items..."
        className="mb-4 w-full rounded-md border px-4 py-2"
      />
      <AddItemForm onAdd={addItem} />
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
