import { useState, useEffect } from "react";
import { FaTag, FaDoorClosed, FaShieldAlt, FaBox } from "react-icons/fa";
import Modal from "@components/modals/Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import toast from "react-hot-toast";
import { useUpdateProductMutation } from "@services/apis/products/hooks";
import { VscEdit } from "react-icons/vsc";

interface Product {
    _id: string;
    price?: number;
    mrp?: number;
    warranty?: string;
    numberOfDoors?: number;
}

interface Props {
    product: Product;
    refetch?: () => void;
}

const ProductDetailsSection = ({ product, refetch }: Props) => {
    const { mutateAsync: onUpdate, isPending } = useUpdateProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [price, setPrice] = useState<number | "">("");
    const [mrp, setMrp] = useState<number | "">("");
    const [warranty, setWarranty] = useState("");
    const [numberOfDoors, setNumberOfDoors] = useState<number | "">("");

    useEffect(() => {
        if (product) {
            setPrice(product.price ?? "");
            setMrp(product.mrp ?? "");
            setWarranty(product.warranty ?? "");
            setNumberOfDoors(product.numberOfDoors ?? "");
        }
    }, [product]);

    const handleSave = async () => {
        if (price === "" || mrp === "" || numberOfDoors === "") {
            toast.error("Please fill all required fields");
            return;
        }

        const updatedData = { price, mrp, warranty, numberOfDoors };
        try {
            await onUpdate({ id: product._id, payload: updatedData });
            toast.success("Product details updated successfully");
            setIsModalOpen(false);
            refetch?.();
        } catch (err) {
            toast.error("Failed to update product");
            console.error(err);
        }
    };

    return (
        <div className="relative">
            {/* Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} width="max-w-3xl">
                <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
                    Update Product Details
                </h2>


                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Price (₹)"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : "")}
                            required
                        />
                        <Input
                            label="MRP (₹)"
                            type="number"
                            value={mrp}
                            onChange={(e) => setMrp(e.target.value ? parseInt(e.target.value) : "")}
                            required
                        />
                        <Input
                            label="Warranty"
                            type="text"
                            value={warranty}
                            onChange={(e) => setWarranty(e.target.value)}
                        />
                        <Input
                            label="Number of Doors"
                            type="number"
                            value={numberOfDoors}
                            onChange={(e) => setNumberOfDoors(e.target.value ? parseInt(e.target.value) : "")}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            text="Cancel"
                            bgColor="bg-gray-400 hover:bg-gray-500"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <Button type="button" text={isPending ? "Saving..." : "Save"} onClick={handleSave} />
                    </div>
                </div>
            </Modal>

            {/* Product Details Display */}
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <FaBox className="mr-2 text-default-600" /> Product Details
            </h2>
            <button onClick={() => setIsModalOpen(true)} className="absolute top-0 right-0 mt-2 mr-2 text-xs bg-default-100 text-default-700 hover:bg-default-200 px-3 py-2 cursor-pointer rounded-md flex items-center shadow-sm transition-colors">
                <VscEdit />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <DetailCard icon={<FaTag />} label="Price" value={price ? `₹${price}` : "N/A"} />
                <DetailCard icon={<FaTag />} label="MRP" value={mrp ? `₹${mrp}` : "N/A"} />
                <DetailCard icon={<FaShieldAlt />} label="Warranty" value={warranty || "N/A"} />
                <DetailCard icon={<FaDoorClosed />} label="Number of Doors" value={numberOfDoors || "N/A"} />
            </div>
        </div>
    );
};

const DetailCard = ({ icon, label, value }: { icon: any; label: string; value: string | number }) => (
    <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
        <div className="flex items-center text-sm text-gray-500 mb-2">
            {icon}
            <span className="ml-2">{label}</span>
        </div>
        <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
);

export default ProductDetailsSection;
