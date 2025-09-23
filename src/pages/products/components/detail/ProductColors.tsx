import Modal from "@components/modals/Modal";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import {
    useUpdateProductColorOptionMutation,
    useAddProductColorOptionMutation,
} from "@services/apis/products/hooks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPalette, FaTimes } from "react-icons/fa";

interface Color {
    _id?: string;
    name: string;
    body: string;
    door?: string;
    images: string[];
    price?: number;
    mrp?: number;
    available?: boolean;
}

interface Product {
    _id: string;
    colors: Color[];
}

interface ProductColorsProps {
    product: Product;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
    refetch: () => void;
}

const ProductColors: React.FC<ProductColorsProps> = ({
    product,
    selectedColorIndex,
    setSelectedColorIndex,
    refetch,
}) => {
    const { mutateAsync: updateMutate, isPending: isUpdating } =
        useUpdateProductColorOptionMutation();
    const { mutateAsync: addMutate, isPending: isAdding } =
        useAddProductColorOptionMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<"edit" | "add">("edit");
    const selectedColor = product.colors[selectedColorIndex];

    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [door, setDoor] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [mrp, setMrp] = useState<number | "">("");
    const [available, setAvailable] = useState(true);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [removeImages, setRemoveImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    // Initialize form when modal opens
    useEffect(() => {
        if (isModalOpen) {
            if (mode === "edit" && selectedColor) {
                setName(selectedColor.name);
                setBody(selectedColor.body);
                setDoor(selectedColor.door || "");
                setExistingImages(selectedColor.images || []);
                setPrice(selectedColor.price || "");
                setMrp(selectedColor.mrp || "");
                setAvailable(selectedColor.available ?? true);
            } else {
                setName("");
                setBody("");
                setDoor("");
                setExistingImages([]);
                setPrice("");
                setMrp("");
                setAvailable(true);
            }
            setRemoveImages([]);
            setNewFiles([]);
            setNewPreviews([]);
        }
    }, [selectedColor, isModalOpen, mode]);

    const handleExistingImageRemove = (url: string) => {
        setRemoveImages((prev) => [...prev, url]);
        setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    const handleNewImageRemove = (index: number) => {
        setNewFiles((prev) => prev.filter((_, i) => i !== index));
        setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        setNewFiles((prev) => [...prev, ...filesArray]);

        const previews = filesArray.map((file) => URL.createObjectURL(file));
        setNewPreviews((prev) => [...prev, ...previews]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (existingImages.length + newFiles.length === 0) {
            toast.error("At least one image is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("body", body);
        formData.append("door", door || "");
        formData.append("price", price?.toString() || "0");
        formData.append("mrp", mrp?.toString() || "0");
        formData.append("available", available.toString());
        removeImages.forEach((img) => formData.append("removeImages[]", img));
        newFiles.forEach((file) => formData.append("images", file));

        try {
            if (mode === "edit" && selectedColor?._id) {
                await updateMutate({
                    productId: product._id,
                    colorId: selectedColor._id,
                    payload: formData,
                });
                toast.success("Color updated successfully");
            } else {
                await addMutate({
                    productId: product._id,
                    payload: formData,
                });
                toast.success("New color added successfully");
            }
            setIsModalOpen(false);
            refetch();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className="relative">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaPalette className="mr-2 text-default-600" /> Color Options
                </h2>
                <div className="flex gap-2 mb-4">
                    <button
                        className="text-xs bg-default-100 text-default-700 hover:bg-default-200 px-3 py-1 rounded-md"
                        onClick={() => {
                            setMode("edit");
                            setIsModalOpen(true);
                        }}
                    >
                        Edit Color
                    </button>
                    <button
                        className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md"
                        onClick={() => {
                            setMode("add");
                            setIsModalOpen(true);
                        }}
                    >
                        Add New Color
                    </button>
                </div>

                {/* Color Circle Selector */}
                <div className="flex flex-wrap gap-4 mb-6">
                    {product.colors.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full border border-gray-300 shadow-sm cursor-pointer ${selectedColorIndex === index
                                    ? "ring-2 ring-offset-2 ring-default-500"
                                    : ""
                                    }`}
                                style={{ backgroundColor: color.body }}
                                title={color.name}
                                onClick={() => setSelectedColorIndex(index)}
                            />
                            <span className="text-xs mt-1">{color.name}</span>
                            <span
                                className={`text-[10px] mt-0.5 ${color.available ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {color.available ? "Available" : "Not Available"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Selected Color Images + Price Below */}
                <div className="text-center text-sm text-gray-700 border rounded-md p-2 mb-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">Price / MRP</div>
                    <div className="whitespace-nowrap">
                        <span className="font-semibold text-green-600">₹{selectedColor.price}</span>{" "}
                        / <span className="text-gray-500 ">₹{selectedColor.mrp}</span>
                    </div>
                </div>



                {selectedColor?.images?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedColor.images.map((image, imgIndex) => (
                            <div
                                key={imgIndex}
                                className="border border-gray-200 rounded-lg overflow-hidden relative bg-white shadow-sm"
                            >
                                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                                    <img
                                        src={image}
                                        alt={`${selectedColor.name} ${imgIndex + 1}`}
                                        className="object-contain h-full w-full"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="max-w-3xl"
            >
                <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
                    {mode === "edit" ? "Update Color" : "Add New Color"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <Input
                            label="Color Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            label="Body Color"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                        <Input
                            label="Door Color"
                            value={door}
                            onChange={(e) => setDoor(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Price (₹)"
                            type="number"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value ? parseInt(e.target.value) : "")
                            }
                        />
                        <Input
                            label="MRP (₹)"
                            type="number"
                            value={mrp}
                            onChange={(e) =>
                                setMrp(e.target.value ? parseInt(e.target.value) : "")
                            }
                        />
                    </div>

                    {/* isAvailable Toggle */}
                    <div className="flex items-center gap-2">
                        <input
                            id="available"
                            type="checkbox"
                            checked={available}
                            onChange={(e) => setAvailable(e.target.checked)}
                        />
                        <label htmlFor="available" className="text-sm font-medium">
                            Available
                        </label>
                    </div>

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div>
                            <p className="font-medium mb-1">Existing Images</p>
                            <div className="flex flex-wrap gap-2">
                                {existingImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-24 h-24 border rounded overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 z-10 text-red-500 bg-white rounded-full p-1 shadow"
                                            onClick={() => handleExistingImageRemove(img)}
                                        >
                                            <FaTimes size={14} />
                                        </button>
                                        <img
                                            src={img}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* New Previews */}
                    {newPreviews.length > 0 && (
                        <div>
                            <p className="font-medium mb-1">New Images</p>
                            <div className="flex flex-wrap gap-2">
                                {newPreviews.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-24 h-24 border rounded overflow-hidden"
                                    >
                                        <button
                                            type="button"
                                            className="absolute top-1 right-1 z-10 text-red-500 bg-white rounded-full p-1 shadow"
                                            onClick={() => handleNewImageRemove(idx)}
                                        >
                                            <FaTimes size={14} />
                                        </button>
                                        <img
                                            src={img}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Add New Images
                        </label>
                        <input type="file" multiple onChange={handleFileChange} />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            text="Cancel"
                            bgColor="bg-gray-400 hover:bg-gray-500"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <Button
                            type="submit"
                            text={
                                isUpdating || isAdding
                                    ? "Saving..."
                                    : mode === "edit"
                                        ? "Update"
                                        : "Add"
                            }
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ProductColors;
