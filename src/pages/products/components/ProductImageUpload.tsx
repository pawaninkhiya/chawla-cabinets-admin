import { type ChangeEvent } from "react";
import type { ProductFormData, ValidationErrors } from "@interfaces/productsTypes";

interface ProductImageUploadProps {
    formData: ProductFormData;
    setFormData: (data: ProductFormData | ((prev: ProductFormData) => ProductFormData)) => void;
    errors: ValidationErrors;
    setErrors: (errors: ValidationErrors | ((prev: ValidationErrors) => ValidationErrors)) => void;
}

const ProductImageUpload = ({ formData, setFormData, errors, setErrors }: ProductImageUploadProps) => {
    const getImagePreview = (image: string | File): string => {
        if (typeof image === 'string') {
            return image;
        } else {
            return URL.createObjectURL(image);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, cardImage: file }));

            if (errors.cardImage) {
                setErrors((prev: any) => {
                    const newErrors = { ...prev };
                    delete newErrors.cardImage;
                    return newErrors;
                });
            }
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${errors.cardImage ? 'border-red-500' : 'border-gray-300'}`}>
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <div className="text-center">
                    {formData.cardImage ? (
                        <div className="flex flex-col items-center">
                            <img
                                src={getImagePreview(formData.cardImage)}
                                className="mt-2 mx-auto max-h-40 rounded-lg shadow-sm"
                                alt="preview"
                            />
                            <p className="mt-3 text-sm text-gray-600">Click to change image</p>
                        </div>
                    ) : (
                        <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="mt-4 flex text-sm text-gray-600">
                                <p className="pl-1">Upload a file or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>
            </div>
            {errors.cardImage && <p className="mt-1 text-sm text-red-600">{errors.cardImage}</p>}
        </div>
    );
};

export default ProductImageUpload;