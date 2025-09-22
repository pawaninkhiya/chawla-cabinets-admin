import { type ChangeEvent } from "react";
import Button from "@components/ui/Button";
import type { ProductFormData, ValidationErrors, ProductColor } from "@interfaces/productsTypes";
import ColorVariant from "./ColorVariant";

interface ColorVariantsSectionProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData | ((prev: ProductFormData) => ProductFormData)) => void;
  errors: ValidationErrors;
  setErrors: (errors: ValidationErrors | ((prev: ValidationErrors) => ValidationErrors)) => void;
}

const ColorVariantsSection = ({ formData, setFormData, errors, setErrors }: ColorVariantsSectionProps) => {
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

  const handleColorChange = (
    index: number,
    field: keyof ProductColor,
    value: string | number | boolean | undefined
  ) => {
    const updatedColors = [...formData.colors!];
    // @ts-ignore
    updatedColors[index][field] = value as any;

    setFormData((prev) => ({ ...prev, colors: updatedColors }));

    // Clear any error for this field
    const errorKey = `${field.charAt(0).toUpperCase() + field.slice(1)}-${index}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
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

  return (
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
          <ColorVariant
            key={idx}
            index={idx}
            color={color}
            errors={errors}
            onRemove={() => removeColor(idx)}
            onChange={(field, value) => handleColorChange(idx, field, value)}
            onImageChange={(e) => handleColorImageChange(idx, e)}
            onRemoveImage={(imageIndex) => removeColorImage(idx, imageIndex)}
          />
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
  );
};

export default ColorVariantsSection;