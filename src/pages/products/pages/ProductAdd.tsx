import { useState, type ChangeEvent } from "react";
import Button from "@components/ui/Button";
import CustomSelect from "@components/ui/CustomSelect";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import type { ProductFormData, ProductColor } from "@interfaces/productsTypes";
import { useGetCategoryOptionsQuery } from "@services/apis/categories/hooks";
import { useGetModelOptionsQuery } from "@services/apis/models/hooks";
import { validateForm } from "../components/ValidateForm";
import { useCreateProductMutation } from "@services/apis/products/hooks";
import toast from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";

// Validation error interface
interface ValidationErrors {
    name?: string;
    modelId?: string;
    categoryId?: string;
    description?: string;
    price?: string;
    mrp?: string;
    cardImage?: string;
    colors?: string;
    [key: string]: string | undefined;
}

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
        colors: [],
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    // Category options
    const { data: categories } = useGetCategoryOptionsQuery();

    // ✅ Models based on categoryId
    const { data: models } = useGetModelOptionsQuery(formData.categoryId)

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

    const handleSubmit = async () => {
        if (!validateForm(formData, setErrors)) return;
        console.log(formData)
        // ✅ Create FormData for file + JSON fields
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

        // ✅ Colors array - append as JSON string for complex objects
        if (formData.colors && formData.colors.length > 0) {
            // First, create a clean version without the File objects
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

            // ✅ Reset form after successful submission
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
            toast.success("Product Created Succussfully!")
        } catch (err) {
            console.error("Error creating product:", err);
            toast.error(getErrorMessage(err))
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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

    // ✅ special handler for category
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, cardImage: file }));

            if (errors.cardImage) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.cardImage;
                    return newErrors;
                });
            }
        }
    };

    const handleColorImageChange = (
        colorIndex: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const updatedColors = [...formData.colors!];

        // Initialize images array if it doesn't exist
        if (!updatedColors[colorIndex].images) {
            updatedColors[colorIndex].images = [];
        }

        // Add the files directly (not as base64)
        updatedColors[colorIndex].images = [
            ...updatedColors[colorIndex].images!,
            ...files
        ];

        setFormData((prev) => ({ ...prev, colors: updatedColors }));

        if (errors[`colorImages-${colorIndex}`]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`colorImages-${colorIndex}`];
                return newErrors;
            });
        }
    };

    const removeColorImage = (colorIndex: number, imageIndex: number) => {
        const updatedColors = [...formData.colors!];
        updatedColors[colorIndex].images?.splice(imageIndex, 1);
        setFormData((prev) => ({ ...prev, colors: updatedColors }));
    };

    const handleColorChange = (
        index: number,
        field: keyof ProductColor,
        value: string | number | boolean
    ) => {
        const updatedColors = [...formData.colors!];
        // @ts-ignore
        updatedColors[index][field] = value;
        setFormData((prev) => ({ ...prev, colors: updatedColors }));

        if (errors[`colorName-${index}`] && field === 'name') {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`colorName-${index}`];
                return newErrors;
            });
        }

        if (errors[`colorBody-${index}`] && field === 'body') {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[`colorBody-${index}`];
                return newErrors;
            });
        }
    };

    const addColor = () => {
        setFormData((prev) => ({
            ...prev,
            colors: [
                ...(prev.colors || []),
                { name: "", body: "", images: [], available: true },
            ],
        }));

        if (errors.colors) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.colors;
                return newErrors;
            });
        }
    };

    const removeColor = (index: number) => {
        const updatedColors = [...formData.colors!];
        updatedColors.splice(index, 1);
        setFormData((prev) => ({ ...prev, colors: updatedColors }));

        setErrors(prev => {
            const newErrors = { ...prev };
            Object.keys(newErrors).forEach(key => {
                if (key.startsWith(`colorName-${index}`) ||
                    key.startsWith(`colorBody-${index}`) ||
                    key.startsWith(`colorImages-${index}`)) {
                    delete newErrors[key];
                }
            });
            return newErrors;
        });
    };

    // Helper function to get image preview URL
    const getImagePreview = (image: string | File): string => {
        if (typeof image === 'string') {
            return image;
        } else {
            return URL.createObjectURL(image);
        }
    };

    return (
        <div className=" mx-auto p-6 bg-white rounded-md  space-y-6">
            {/* API Error Display */}
            {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    Error: {apiError.message || "Failed to create product"}
                </div>
            )}

            {/* Card Image Upload */}
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
                        // error={errors.categoryId}
                        required
                    />

                    {/* Model (disabled until category selected) */}
                    <CustomSelect
                        id="modelId"
                        label="Select Model"
                        options={modelsOptions}
                        value={formData.modelId}
                        setFieldValue={(val) => handleSelectChange("modelId", val)}
                        // error={errors.modelId}
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

            {/* Colors Section */}
            <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">Color Variants</h3>
                    <Button
                        type="button"
                        text="Add Color Variant"
                        onClick={addColor}
                        icon={
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        }
                    />
                </div>

                {errors.colors && <p className="mb-4 text-sm text-red-600">{errors.colors}</p>}

                <div className="space-y-4">
                    {formData.colors?.map((color, idx) => (
                        <div
                            key={idx}
                            className="p-4 border rounded-lg space-y-4 bg-gray-50 relative shadow-sm"
                        >
                            <div className="absolute top-3 right-3">
                                <button
                                    type="button"
                                    onClick={() => removeColor(idx)}
                                    className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-colors"
                                    title="Remove color variant"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>

                            <h4 className="font-medium text-gray-700">Color Variant #{idx + 1}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Color Name"
                                    value={color.name}
                                    onChange={(e) => handleColorChange(idx, "name", e.target.value)}
                                    placeholder="e.g., Midnight Black"
                                    error={errors[`colorName-${idx}`]}
                                    required
                                />
                                <Input
                                    label="Body Color"
                                    value={color.body}
                                    onChange={(e) => handleColorChange(idx, "body", e.target.value)}
                                    placeholder="Hex code or color name"
                                    error={errors[`colorBody-${idx}`]}
                                    required
                                />
                                <Input
                                    label="Door Color"
                                    value={color.door || ""}
                                    onChange={(e) => handleColorChange(idx, "door", e.target.value)}
                                    placeholder="Hex code or color name"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Price"
                                        type="number"
                                        value={color.price || 0}
                                        onChange={(e) =>
                                            handleColorChange(idx, "price", Number(e.target.value))
                                        }
                                        min="0"
                                        step="0.01"
                                    />
                                    <Input
                                        label="MRP"
                                        type="number"
                                        value={color.mrp || 0}
                                        onChange={(e) =>
                                            handleColorChange(idx, "mrp", Number(e.target.value))
                                        }
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Color Images Upload */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color Images</label>
                                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${errors[`colorImages-${idx}`] ? 'border-red-500' : 'border-gray-300'}`}>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                                        onChange={(e) => handleColorImageChange(idx, e)}
                                        accept="image/*"
                                        multiple
                                    />
                                    <div className="text-center">
                                        <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF (multiple selection allowed)</p>
                                    </div>
                                </div>
                                {errors[`colorImages-${idx}`] && <p className="mt-1 text-sm text-red-600">{errors[`colorImages-${idx}`]}</p>}

                                {/* Display uploaded images */}
                                {color.images && color.images.length > 0 && (
                                    <div className="mt-4">
                                        <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h5>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                            {color.images.map((image, imageIdx) => (
                                                <div key={imageIdx} className="relative group">
                                                    <img
                                                        src={getImagePreview(image)}
                                                        alt={`Color ${idx + 1} - Image ${imageIdx + 1}`}
                                                        className="h-30 w-full object-contain rounded-md border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeColorImage(idx, imageIdx)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove image"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={color.available}
                                            onChange={(e) => handleColorChange(idx, "available", e.target.checked)}
                                        />
                                        <div className={`block w-14 h-7 rounded-full ${color.available ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition transform ${color.available ? 'translate-x-7' : ''}`}></div>
                                    </div>
                                    <div className="ml-3 text-gray-700 font-medium">
                                        {color.available ? "Available" : "Not Available"}
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}

                    {formData.colors?.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No color variants</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding your first color variant.</p>
                            <div className="mt-6">
                                <Button
                                    type="button"
                                    text="Add Color Variant"
                                    onClick={addColor}
                                    size="sm"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Buttons */}
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
                    onClick={handleSubmit}
                    disabled={isPending}
                />
            </div>
        </div>
    );
};

export default ProductAdd;