import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

type AddButtonProps = {
  onClick: () => void;
};

export default function AddButton({ onClick }: AddButtonProps) {
  return (
    <Button className="rounded-md px-3 py-1" onClick={onClick}>
      <PlusIcon size={22} />
    </Button>
  );
}
