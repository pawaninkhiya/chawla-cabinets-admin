import { useState } from "react";
import Modal from "@components/modals/Modal";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";
import { useGetCategoryOptionsQuery } from "@services/apis/categories/hooks";
import CustomSelect from "@components/ui/CustomSelect";

interface CreateModelModalModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string; categoryId: string }) => void;
  isPending: boolean;
}

const CreateModelModalModal: React.FC<CreateModelModalModalProps> = ({ open, onClose, onSubmit, isPending }) => {
  const { data: categories } = useGetCategoryOptionsQuery();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const categoryOptions =
    categories?.map((cat: { _id: string; categoryName: string }) => ({
      value: cat._id,
      label: cat.categoryName,
    })) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !categoryId) return;

    onSubmit({ name, description, categoryId });

    // reset form
    setName("");
    setDescription("");
    setCategoryId("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} width="max-w-2xl">
      <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
        Create Model
      </h2>

      <form onSubmit={handleSubmit} >
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input
            label="Model Name"
            placeholder="Enter model name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <CustomSelect
            id="categoryId"
            label="Select Category"
            options={categoryOptions}
            value={categoryId}
            setFieldValue={(val) => setCategoryId(val)}
            required
          />

        </div>
        <Textarea
          label="Description"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText="Write a short model description"
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            text="Cancel"
            onClick={onClose}
            bgColor="bg-gray-400 hover:bg-gray-500"
          />
          <Button type="submit" text="Submit" isLoading={isPending} loadingText="Creating..." />
        </div>
      </form>
    </Modal>
  );
};

export default CreateModelModalModal;
