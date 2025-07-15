import Modal from "./modal";
import { Button } from "./button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  description,
}: AlertModalProps) => {
  return (
    <Modal
      title="Are you sure?"
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"destructive"} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
