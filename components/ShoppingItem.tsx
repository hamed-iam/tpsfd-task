import { useState } from "react";
import Image from "next/image";

import { Checkbox } from "@/components/ui";
import { type Product } from "@/data/types";

interface ShoppingItemProps {
  item: Product;
  onToggle: () => void;
}

const ShoppingItem = ({ item, onToggle }: ShoppingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const getTruncatedDescription = (text: string, limit: number) =>
    text.length > limit && !isExpanded ? `${text.slice(0, limit)}...` : text;

  return (
    <div className="relative flex items-center space-x-4 rounded-lg border px-3 py-5 shadow-md">
      <section className="flex flex-col items-center gap-1">
        <Image
          src={item.base64Image || "/images/fallback.png"}
          alt={item.title}
          width={50}
          height={50}
          className="h-12 w-12 object-cover"
        />
        <span className="font-bold"> {item.price || ""}</span>
      </section>
      <section className="flex flex-1 items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-secondary">
            {getTruncatedDescription(item.description, 50)}
          </p>
          {item.description.length > 50 && (
            <button
              onClick={toggleExpanded}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <Checkbox checked={item.checked} onCheckedChange={onToggle} />
      </section>
    </div>
  );
};

export default ShoppingItem;
