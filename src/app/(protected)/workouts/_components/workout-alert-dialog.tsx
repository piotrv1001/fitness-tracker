import AlertDialogWrapper from "@/components/alert-dialog-wrapper";

type WorkoutAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function WorkoutAlertDialog({
  open,
  onOpenChange,
  onSubmit,
  onCancel,
}: WorkoutAlertDialogProps) {
  return (
    <AlertDialogWrapper
      title="Delete Workout"
      description="Are you sure you want to delete this workout?"
      open={open}
      onOpenChange={onOpenChange}
      onCancel={onCancel}
      onConfirm={onSubmit}
    />
  );
}
