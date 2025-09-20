import { toast } from "react-hot-toast";
import type { ProductFormData, ProductColor } from "@interfaces/productsTypes";

export interface ValidationErrors {
    [key: string]: string;
}

export const validateForm = (
    formData: ProductFormData,
    setErrors: (errors: ValidationErrors) => void
): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.modelId) newErrors.modelId = "Please select a model";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";
    if (!formData.description?.trim())
        newErrors.description = "Description is required";
    if (formData.price <= 0)
        newErrors.price = "Price must be greater than 0";
    if (formData.mrp <= 0) newErrors.mrp = "MRP must be greater than 0";
    if (formData.mrp < formData.price)
        newErrors.mrp = "MRP must be greater than or equal to price";
    if (!formData.cardImage)
        newErrors.cardImage = "Product image is required";

    // Colors validation
    if (!formData.colors || formData.colors.length === 0) {
        newErrors.colors = "At least one color variant is required";
    } else {
        formData.colors.forEach((color: ProductColor, index: number) => {
            if (!color.name.trim()) {
                newErrors[`colorName-${index}`] = `Color name is required for variant ${index + 1
                    }`;
            }
            if (!color.body.trim()) {
                newErrors[`colorBody-${index}`] = `Body color is required for variant ${index + 1
                    }`;
            }
            if (!color.images || color.images.length === 0) {
                newErrors[`colorImages-${index}`] = `At least one image is required for variant ${index + 1
                    }`;
            }
        });
    }

    setErrors(newErrors);

    // ✅ Show toast for first error
    if (Object.keys(newErrors).length > 0) {
        const firstErrorKey = Object.keys(newErrors)[0];
        toast.error(newErrors[firstErrorKey] || "Validation error");
        return false;
    }

    return true;
};
