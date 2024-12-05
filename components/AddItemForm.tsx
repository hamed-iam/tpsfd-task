import { useState } from "react";
import { Input, Button } from "@/components/ui";

interface AddItemFormProps {
  onAdd: (item: string) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border bg-white p-4 dark:bg-black">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new item"
          className="w-full"
        />

        <Button
          onClick={handleAdd}
          disabled={!inputValue}
          className="w-full sm:w-auto"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
