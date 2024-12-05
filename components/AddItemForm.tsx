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
    <div className="flex items-center space-x-2 p-4">
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
};

export default AddItemForm;
