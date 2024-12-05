"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";

import { debounce } from "@/utils/debounce";
import { Input } from "@/components/ui/input";
import AddItemForm from "@/components/AddItemForm";
import ShoppingItem from "@/components/ShoppingItem";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { TrashIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/products.json";
import { type NewProduct } from "@/data/types";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(
    data.products.map((item) => ({ ...item, checked: false })),
  );

  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const handleAddItem = (title: string) => {
    const newItem: NewProduct = {
      title,
      checked: false,
      base64Image: "",
      price: 0,
      strikePrice: 0,
      description: "",
    };

    setItems((prev) => {
      const updatedItems = [...prev, { ...newItem, id: Date.now().toString() }];
      setTimeout(() => {
        itemsContainerRef.current?.scrollTo({
          top: itemsContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
      return updatedItems;
    });
  };

  const handleToggleItemChecked = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleDeleteChecked = () => {
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

  const handleClearSearch = () => {
    setSearchQuery("");
    setInputValue("");
  };

  const totalShoppingAmount = items
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);

  return (
    <div className="space-y-4 p-4">
      <header className="fixed left-0 top-0 z-10 w-full bg-white p-4 shadow-md dark:bg-black">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Shopping List</h1>
          <section className="flex gap-2">
            {items.some((item) => item.checked) && (
              <Button
                variant="destructive"
                onClick={handleDeleteChecked}
                size="icon"
              >
                <TrashIcon />
              </Button>
            )}
            <DarkModeToggle />
          </section>
        </div>
        <h2>
          Total:
          <span className="mx-1 font-semibold">${totalShoppingAmount}</span>
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for items..."
          />
          {searchQuery && (
            <Button size="icon" variant="outline" onClick={handleClearSearch}>
              <X />
            </Button>
          )}
        </div>
      </header>

      <div
        ref={itemsContainerRef}
        className="max-h-[calc(100vh-100px)] space-y-2 overflow-y-auto px-2 pb-8 pt-28"
      >
        {filteredItems.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={() => handleToggleItemChecked(item.id)}
          />
        ))}
        {!filteredItems.length && (
          <h2 className="text-center font-semibold">No Items</h2>
        )}
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-full border bg-white dark:bg-black">
        <AddItemForm onAdd={handleAddItem} />
      </div>
    </div>
  );
}
