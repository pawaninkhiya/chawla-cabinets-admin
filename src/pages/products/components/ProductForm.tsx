import { type ChangeEvent } from "react";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import CustomSelect from "@components/ui/CustomSelect";
import type { ProductFormData, ValidationErrors } from "@interfaces/productsTypes";
import { useGetCategoryOptionsQuery } from "@services/apis/categories/hooks";
import { useGetModelOptionsQuery } from "@services/apis/models/hooks";

interface ProductFormProps {
    formData: ProductFormData;
    setFormData: (data: ProductFormData | ((prev: ProductFormData) => ProductFormData)) => void;
    errors: ValidationErrors;
    setErrors: (errors: ValidationErrors | ((prev: ValidationErrors) => ValidationErrors)) => void;
}

const ProductForm = ({ formData, setFormData, errors, setErrors }: ProductFormProps) => {
    const { data: categories } = useGetCategoryOptionsQuery();
    const { data: models } = useGetModelOptionsQuery(formData.categoryId);

    const categoryOptions =
        categories?.map((cat: { _id: string; categoryName: string }) => ({
            value: cat._id,
            label: cat.categoryName,
        })) || [];

    const modelsOptions =
        models?.map((cat: { _id: string; name: string }) => ({
            value: cat._id,
            label: cat.name,
        })) || [];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSelectChange = (field: keyof ProductFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            categoryId: value,
            modelId: "", // reset model when category changes
        }));

        if (errors.categoryId) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.categoryId;
                return newErrors;
            });
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Fields */}
            <div className="space-y-4">
                <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                />

                {/* Category */}
                <CustomSelect
                    id="categoryId"
                    label="Select Category"
                    options={categoryOptions}
                    value={formData.categoryId}
                    setFieldValue={handleCategoryChange}
                    error={Boolean(errors.categoryId)}
                    required
                />

                {/* Model (disabled until category selected) */}
                <CustomSelect
                    id="modelId"
                    label="Select Model"
                    options={modelsOptions}
                    value={formData.modelId}
                    setFieldValue={(val: any) => handleSelectChange("modelId", val)}
                    error={Boolean(errors.modelId)}
                    required
                    isDisabled={!formData.categoryId}
                />

                <Input
                    label="Number of Doors"
                    type="number"
                    name="numberOfDoors"
                    value={formData.numberOfDoors}
                    onChange={handleInputChange}
                    required
                    min="1"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        error={errors.price}
                        required
                    />
                    <Input
                        label="MRP"
                        type="number"
                        name="mrp"
                        value={formData.mrp}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        error={errors.mrp}
                        required
                    />
                </div>
            </div>

            <div className="space-y-4">
                <Input
                    label="Material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                />
                <Input
                    label="Warranty"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                />
                <Input
                    label="Paint Type"
                    name="paintType"
                    value={formData.paintType}
                    onChange={handleInputChange}
                />
                <Input
                    label="Color Options Count"
                    type="number"
                    name="colorOptionsCount"
                    value={formData.colorOptionsCount}
                    onChange={handleInputChange}
                    min="0"
                />

                <Textarea
                    label="Description"
                    placeholder="Enter description..."
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    helperText="Write a short product description"
                    rows={4}
                    error={errors.description}
                    required
                />
            </div>
        </div>
    );
};

export default ProductForm;