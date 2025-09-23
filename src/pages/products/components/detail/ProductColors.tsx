import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import toast from "react-hot-toast";
import { FaPalette } from 'react-icons/fa';

import SortableImage from "./SortableImage";
import ColorSelector from "./ColorSelector";
import PriceDisplay from "./PriceDisplay";
import ColorModal from "./ColorModal";
import {
    useUpdateProductColorOptionMutation,
    useAddProductColorOptionMutation,
    useUpdateProductColorImagesOrderMutation
} from "@services/apis/products/hooks";

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
    product?: Product;
    selectedColorIndex: number;
    setSelectedColorIndex: (index: number) => void;
    refetch: () => void;
}

const ProductColors: React.FC<ProductColorsProps> = ({ product, selectedColorIndex, setSelectedColorIndex, refetch }) => {
    const { mutateAsync: updateMutate, isPending: isUpdating } = useUpdateProductColorOptionMutation();
    const { mutateAsync: addMutate, isPending: isAdding } = useAddProductColorOptionMutation();
    const { mutateAsync: updateOrderMutate } = useUpdateProductColorImagesOrderMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<"edit" | "add">("edit");

    const selectedColor = product?.colors?.[selectedColorIndex];

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

    // Initialize modal form
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
        setRemoveImages(prev => [...prev, url]);
        setExistingImages(prev => prev.filter(img => img !== url));
    };

    const handleNewImageRemove = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
        setNewPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        setNewFiles(prev => [...prev, ...filesArray]);
        const previews = filesArray.map(file => URL.createObjectURL(file));
        setNewPreviews(prev => [...prev, ...previews]);
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
        removeImages.forEach(img => formData.append("removeImages[]", img));
        newFiles.forEach(file => formData.append("images", file));

        try {
            if (mode === "edit" && selectedColor?._id && product?._id) {
                await updateMutate({
                    productId: product._id,
                    colorId: selectedColor._id,
                    payload: formData,
                });
                toast.success("Color updated successfully");
            } else if (product?._id) {
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

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || !selectedColor?._id || !product?._id) return;
        if (active.id !== over.id) {
            const oldIndex = selectedColor.images.findIndex(img => img === active.id);
            const newIndex = selectedColor.images.findIndex(img => img === over.id);
            const reordered = arrayMove(selectedColor.images, oldIndex, newIndex);

            try {
                await updateOrderMutate({
                    productId: product._id,
                    colorId: selectedColor._id,
                    newOrder: reordered,
                });
                toast.success("Images reordered successfully");
                refetch();
            } catch (err) {
                console.error(err);
                toast.error("Failed to update image order");
            }
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <>
            <div className="relative">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FaPalette className="mr-2 text-default-600" /> Color Options
                </h2>

                <div className="flex gap-2 mb-4">
                    <button className="text-xs bg-default-100 text-default-700 hover:bg-default-200 px-3 py-1 rounded-md" onClick={() => { setMode("edit"); setIsModalOpen(true); }}>
                        Edit Color
                    </button>
                    <button className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-md" onClick={() => { setMode("add"); setIsModalOpen(true); }}>
                        Add New Color
                    </button>
                </div>

                {/* Color Selector */}
                <ColorSelector colors={product.colors} selectedColorIndex={selectedColorIndex} setSelectedColorIndex={setSelectedColorIndex} />

                {/* Price Display */}
                <PriceDisplay price={selectedColor?.price} mrp={selectedColor?.mrp} />

                {/* Drag & Drop Images */}
                {selectedColor && selectedColor?.images?.length > 0 && (
                    <>
                        <p className="text-sm text-gray-500 mb-2">Drag & drop the images below to reorder them</p>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={selectedColor.images} strategy={horizontalListSortingStrategy}>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedColor.images.map((img, idx) => (
                                        <SortableImage key={img} img={img} index={idx} colorName={selectedColor.name} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </>
                )}
            </div>

            {/* Modal */}
            <ColorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={mode}
                name={name}
                body={body}
                door={door}
                price={price}
                mrp={mrp}
                available={available}
                existingImages={existingImages}
                newPreviews={newPreviews}
                handleSubmit={handleSubmit}
                setName={setName}
                setBody={setBody}
                setDoor={setDoor}
                setPrice={setPrice}
                setMrp={setMrp}
                setAvailable={setAvailable}
                handleFileChange={handleFileChange}
                handleExistingImageRemove={handleExistingImageRemove}
                handleNewImageRemove={handleNewImageRemove}
                isUpdating={isUpdating}
                isAdding={isAdding}
            />
        </>
    );
};

export default ProductColors;
