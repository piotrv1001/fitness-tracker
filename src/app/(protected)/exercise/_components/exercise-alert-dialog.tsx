import AlertDialogWrapper from "@/components/alert-dialog-wrapper";

type ExerciseAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function ExerciseAlertDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: ExerciseAlertDialogProps) {
  return (
    <AlertDialogWrapper
      title="Delete Exercise"
      description="Are you sure you want to delete this exercise?"
      open={open}
      onOpenChange={onOpenChange}
      onCancel={onCancel}
      onConfirm={onSubmit}
    />
  );
}
