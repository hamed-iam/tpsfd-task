import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const ShoppingItem = ({
  item,
  onToggle,
}: {
  item: any;
  onToggle: () => void;
}) => {
  return (
    <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md">
      <Checkbox checked={item.checked} onCheckedChange={onToggle} />
      <Image
        src={item.base64Image || "/images/fallback.png"}
        alt={item.title}
        width={50}
        height={50}
        className="h-12 w-12 object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-secondary">{item.description}</p>
      </div>
    </div>
  );
};

export default ShoppingItem;
