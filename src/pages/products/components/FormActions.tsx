import Button from "@components/ui/Button";

interface FormActionsProps {
  isPending: boolean;
  onSubmit: () => void;
}

const FormActions = ({ isPending, onSubmit }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
      <Button
        type="button"
        text="Cancel"
        onClick={() => { }}
        bgColor="bg-gray-100 hover:bg-gray-200 text-gray-700"
      />
      <Button
        type="button"
        text={isPending ? "Creating..." : "Create Product"}
        onClick={onSubmit}
        disabled={isPending}
      />
    </div>
  );
};

export default FormActions;