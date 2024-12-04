import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddItemFormProps {
  onAdd: (item: string) => void;
}

const AddItemForm = ({ onAdd }: AddItemFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="flex items-center space-x-2 rounded-lg p-2 shadow-sm">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new item"
        className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <Button
        onClick={handleAdd}
        className="transform rounded-md px-4 py-2 text-white transition-transform hover:scale-105 active:scale-95"
      >
        Add
      </Button>
    </div>
  );
};

export default AddItemForm;
