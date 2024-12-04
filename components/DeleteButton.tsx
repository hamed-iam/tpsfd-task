import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

const DeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <Button variant="destructive" onClick={onDelete} size="icon">
    <TrashIcon />
  </Button>
);

export default DeleteButton;
