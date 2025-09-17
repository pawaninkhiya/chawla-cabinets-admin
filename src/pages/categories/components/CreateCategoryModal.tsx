import { useState } from "react";
import Modal from "@components/modals/Modal";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";

interface CreateCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { categoryName: string; description: string }) => void;
    isPending: boolean;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
    open,
    onClose,
    onSubmit,
    isPending
}) => {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) return;

        onSubmit({ categoryName, description });

        setCategoryName("");
        setDescription("");
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose} width="max-w-lg">
            <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
                Create Category
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
                    required
                    helperText="Write a short category description"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        text="Cancel"
                        onClick={onClose}
                        bgColor="bg-gray-400 hover:bg-gray-500"
                    />
                    <Button type="submit" text="Submit" isLoading={isPending} loadingText="creating.." />
                </div>
            </form>
        </Modal>
    );
};

export default CreateCategoryModal;
