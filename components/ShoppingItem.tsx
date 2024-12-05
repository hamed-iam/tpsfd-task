import { useState } from "react";
import Image from "next/image";

import { Checkbox } from "@/components/ui";
import { type Product } from "@/data/types";
import { getTruncatedDescription } from "@/lib/utils";

interface ShoppingItemProps {
  item: Product;
  onToggle: () => void;
}

const ShoppingItem = ({ item, onToggle }: ShoppingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    item.base64Image || "/images/fallback.png",
  );

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="relative flex items-center space-x-4 rounded-lg border px-3 py-5 shadow-md">
      <section className="flex flex-col items-center gap-1">
        <div className="relative h-12 w-12">
          {!isImageLoaded && (
            <div className="absolute inset-0 animate-pulse rounded-full bg-gray-300"></div>
          )}

          <Image
            src={imageSrc}
            alt={`Image of ${item.title}`}
            width={48}
            height={48}
            loading="lazy"
            className={`h-full w-full rounded-full object-cover transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageSrc("/images/fallback.png")}
          />
        </div>
        <span className="font-bold"> {item.price || ""}</span>
      </section>
      <section className="flex flex-1 items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-secondary">
            {getTruncatedDescription(item.description, 50, isExpanded)}
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
