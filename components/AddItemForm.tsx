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
    <div className="fixed bottom-0 left-0 z-10 flex w-full items-center space-x-2 border bg-white p-4 dark:bg-black">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new item"
      />

      <Button onClick={handleAdd} disabled={!inputValue}>
        Add
      </Button>
    </div>
  );
}
