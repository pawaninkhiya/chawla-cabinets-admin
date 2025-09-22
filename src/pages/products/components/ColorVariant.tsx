import { type ChangeEvent } from "react";
import Input from "@components/ui/Input";
import type { ProductColor, ValidationErrors } from "@interfaces/productsTypes";

interface ColorVariantProps {
    index: number;
    color: ProductColor;
    errors: ValidationErrors;
    onRemove: () => void;
    onChange: (field: keyof ProductColor, value: string | number | boolean | undefined) => void;
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (imageIndex: number) => void;
}

const ColorVariant = ({
    index,
    color,
    errors,
    onRemove,
    onChange,
    onImageChange,
    onRemoveImage
}: ColorVariantProps) => {
    const getImagePreview = (image: string | File): string => {
        if (typeof image === 'string') {
            return image;
        } else {
            return URL.createObjectURL(image);
        }
    };

    return (
        <div className="p-4 border rounded-lg space-y-4 bg-gray-50 relative shadow-sm">
            <div className="absolute top-3 right-3">
                <button
                    type="button"
                    onClick={onRemove}
                    className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-colors"
                    title="Remove color variant"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>

            <h4 className="font-medium text-gray-700">Color Variant #{index + 1}</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Color Name"
                    value={color.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="e.g., Midnight Black"
                    error={errors[`colorName-${index}`]}
                    required
                />
                <Input
                    label="Body Color"
                    value={color.body}
                    onChange={(e) => onChange("body", e.target.value)}
                    placeholder="Hex code or color name"
                    error={errors[`colorBody-${index}`]}
                    required
                />
                <Input
                    label="Door Color"
                    value={color.door || ""}
                    onChange={(e) => onChange("door", e.target.value)}
                    placeholder="Hex code or color name"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Price"
                        type="number"
                        value={color.price ?? ""}
                        onChange={(e) => onChange("price", e.target.value === "" ? undefined : Number(e.target.value))}
                        min="0"
                        step="0.01"
                    />

                    <Input
                        label="MRP"
                        type="number"
                        value={color.mrp ?? ""}
                        onChange={(e) => onChange("mrp", e.target.value === "" ? undefined : Number(e.target.value))}
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            {/* Color Images Upload */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Images</label>
                <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${errors[`colorImages-${index}`] ? 'border-red-500' : 'border-gray-300'}`}>
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                        onChange={onImageChange}
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
                {errors[`colorImages-${index}`] && <p className="mt-1 text-sm text-red-600">{errors[`colorImages-${index}`]}</p>}

                {/* Display uploaded images */}
                {color.images && color.images.length > 0 && (
                    <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {color.images.map((image, imageIdx) => (
                                <div key={imageIdx} className="relative group">
                                    <img
                                        src={getImagePreview(image)}
                                        alt={`Color ${index + 1} - Image ${imageIdx + 1}`}
                                        className="h-30 w-full object-contain rounded-md border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemoveImage(imageIdx)}
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
                            onChange={(e) => onChange("available", e.target.checked)}
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
    );
};

export default ColorVariant;