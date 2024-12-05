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
      className="h-[calc(100vh-150px)] overflow-y-auto px-4 sm:h-[calc(100vh-100px)]"
    >
      <div className="flex flex-col gap-2 py-[150px] sm:py-[140px]">
        {(data || []).map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onToggle={() => onToggleItemChecked(item.id)}
          />
        ))}
        {!data.length && (
          <h2 className="text-center font-semibold">No Items</h2>
        )}
      </div>
    </div>
  );
}
