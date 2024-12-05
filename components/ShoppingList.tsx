import { Product } from "@/data/types";
import { RefObject } from "react";
import ShoppingItem from "./ShoppingItem";

interface ShoppingListProps {
  data: Product[];
  itemsContainerRef: RefObject<HTMLDivElement>;
  onToggleItemChecked: (id: string) => void;
}

export default function ShoppingList({
  data,
  itemsContainerRef,
  onToggleItemChecked,
}: ShoppingListProps) {
  return (
    <div
      ref={itemsContainerRef}
      className="max-h-[calc(100vh-100px)] space-y-2 overflow-y-auto px-2 pb-14 pt-32 sm:pb-8"
    >
      {(data || []).map((item) => (
        <ShoppingItem
          key={item.id}
          item={item}
          onToggle={() => onToggleItemChecked(item.id)}
        />
      ))}
      {!data.length && <h2 className="text-center font-semibold">No Items</h2>}
    </div>
  );
}
