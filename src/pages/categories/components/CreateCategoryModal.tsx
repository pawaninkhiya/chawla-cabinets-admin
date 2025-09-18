import { useEffect, useState } from "react";
import Modal from "@components/modals/Modal";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";
import type { Category } from "@interfaces/categoriesTypes";

interface CreateCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { categoryName: string; description: string }) => void;
    isPending: boolean;
    defaultValues?: Category; // ✅ new prop
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
    open,
    onClose,
    onSubmit,
    isPending,
    defaultValues,
}) => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    // ✅ Prefill on edit
    useEffect(() => {
        if (defaultValues) {
            setCategoryName(defaultValues.categoryName || "");
            setDescription(defaultValues.description || "");
        } else {
            setCategoryName("");
            setDescription("");
        }
    }, [defaultValues, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) return;
        onSubmit({ categoryName, description });
    };

    return (
        <Modal open={open} onClose={onClose} width="max-w-lg">
            <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
                {defaultValues ? "Edit Category" : "Create Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Category Name"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />

                <Textarea
                    label="Description"
                    placeholder="Enter description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText="Write a short category description"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        text="Cancel"
                        onClick={onClose}
                        bgColor="bg-gray-400 hover:bg-gray-500"
                    />
                    <Button
                        type="submit"
                        text={defaultValues ? "Update" : "Submit"}
                        isLoading={isPending}
                        loadingText={defaultValues ? "Updating..." : "Creating..."}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default CreateCategoryModal;
