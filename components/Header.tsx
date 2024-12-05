import { ChangeEvent } from "react";
import { TrashIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { Input } from "./ui/input";
import { Product } from "@/data/types";

interface HeaderProps {
  items: Product[];
  inputValue: string;
  searchQuery: string;
  onClearSearch: () => void;
  onDeleteChecked: () => void;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({
  items,
  inputValue,
  searchQuery,
  onDeleteChecked,
  onClearSearch,
  onSearch,
}: HeaderProps) {
  const totalShoppingAmount = items
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);

  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-white p-4 shadow-md dark:bg-black">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Shopping List</h1>
        <section className="flex gap-2">
          {items.some((item) => item.checked) && (
            <Button variant="destructive" onClick={onDeleteChecked} size="icon">
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

      {/* Should be moved to a form, but since it's not part of the task, it would be overkill */}
      <div className="mt-3 flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={onSearch}
          placeholder="Search for items..."
        />
        {searchQuery && (
          <Button size="icon" variant="outline" onClick={onClearSearch}>
            <X />
          </Button>
        )}
      </div>
    </header>
  );
}
