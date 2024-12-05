"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";

import data from "@/data/products.json";
import { type NewProduct } from "@/data/types";

import Header from "@/components/Header";
import ShoppingList from "@/components/ShoppingList";
import AddItemForm from "@/components/AddItemForm";
import { debounce } from "@/lib/utils";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(
    data.products.map((item) => ({ ...item, checked: false })),
  );

  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const debouncedSetSearchQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, 300),
    [setSearchQuery],
  );

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

  const handleDeleteChecked = () =>
    setItems((prev) => prev.filter((item) => !item.checked));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setInputValue("");
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4 p-4">
      <Header
        inputValue={inputValue}
        searchQuery={searchQuery}
        items={items}
        onClearSearch={handleClearSearch}
        onDeleteChecked={handleDeleteChecked}
        onSearch={handleInputChange}
      />

      <ShoppingList
        data={filteredItems}
        itemsContainerRef={itemsContainerRef}
        onToggleItemChecked={handleToggleItemChecked}
      />

      <AddItemForm onAdd={handleAddItem} />
    </div>
  );
}
