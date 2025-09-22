import { useState } from "react";
import { useCreateProductMutation } from "@services/apis/products/hooks";
import toast from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";
import type { ProductFormData, ValidationErrors } from "@interfaces/productsTypes";
import { validateForm } from "../components/ValidateForm";
import ProductImageUpload from "../components/ProductImageUpload";
import ProductForm from "../components/ProductForm";
import ColorVariantsSection from "../components/ColorVariantsSection";
import FormActions from "../components/FormActions";
import ApiErrorDisplay from "../components/ApiErrorDisplay";

const ProductAdd = () => {
    const { mutateAsync, isPending, error: apiError } = useCreateProductMutation();
    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        modelId: "",
        categoryId: "",
        description: "",
        numberOfDoors: 1,
        colorOptionsCount: 0,
        price: 0,
        mrp: 0,
        material: "Steel",
        warranty: "5 Years",
        paintType: "Powder Coating",
        cardImage: "",
        colors: []
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleSubmit = async () => {
        if (!validateForm(formData, setErrors)) return;

        const payload = new FormData();

        // Append simple fields
        payload.append("name", formData.name);
        payload.append("modelId", formData.modelId);
        payload.append("categoryId", formData.categoryId);
        if (formData.description) payload.append("description", formData.description);
        payload.append("numberOfDoors", String(formData.numberOfDoors));
        payload.append("colorOptionsCount", String(formData.colorOptionsCount));
        payload.append("price", String(formData.price));
        payload.append("mrp", String(formData.mrp));
        if (formData.material) payload.append("material", formData.material);
        if (formData.warranty) payload.append("warranty", formData.warranty);
        if (formData.paintType) payload.append("paintType", formData.paintType);

        // Append card image as file if it's a File object
        if (formData.cardImage instanceof File) {
            payload.append("cardImage", formData.cardImage);
        }

        // Colors array - append as JSON string for complex objects
        if (formData.colors && formData.colors.length > 0) {
            const colorsForJson = formData.colors.map(color => ({
                name: color.name,
                body: color.body,
                door: color.door || "",
                price: color.price || 0,
                mrp: color.mrp || 0,
                available: color.available
            }));

            payload.append("colors", JSON.stringify(colorsForJson));
            formData.colors.forEach((color, index) => {
                if (color.images) {
                    color.images.forEach((img, imgIndex) => {
                        if (img instanceof File) {
                            payload.append(`color_${index}_image_${imgIndex}`, img);
                        }
                    });
                }
            });
        }

        try {
            await mutateAsync(payload);

            // Reset form after successful submission
            setFormData({
                name: "",
                modelId: "",
                categoryId: "",
                description: "",
                numberOfDoors: 1,
                colorOptionsCount: 0,
                price: 0,
                mrp: 0,
                material: "Steel",
                warranty: "5 Years",
                paintType: "Powder Coating",
                cardImage: "",
                colors: [],
            });
            setErrors({});
            toast.success("Product Created Successfully!");
        } catch (err) {
            console.error("Error creating product:", err);
            toast.error(getErrorMessage(err));
        }
    };

    return (
        <div className="mx-auto p-6 bg-white rounded-md space-y-6">
            <ApiErrorDisplay error={apiError} />

            <ProductImageUpload
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
            />

            <ProductForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
            />

            <ColorVariantsSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
            />

            <FormActions
                isPending={isPending}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default ProductAdd;