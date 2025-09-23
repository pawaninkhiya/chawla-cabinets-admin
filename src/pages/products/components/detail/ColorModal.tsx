import Modal from "@components/modals/Modal";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { FaTimes } from 'react-icons/fa';

interface ColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    name: string;
    body: string;
    door: string;
    price: number | "";
    mrp: number | "";
    available: boolean;
    existingImages: string[];
    newPreviews: string[];
    handleSubmit: (e: React.FormEvent) => void;
    setName: (val: string) => void;
    setBody: (val: string) => void;
    setDoor: (val: string) => void;
    setPrice: (val: number | "") => void;
    setMrp: (val: number | "") => void;
    setAvailable: (val: boolean) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleExistingImageRemove: (url: string) => void;
    handleNewImageRemove: (index: number) => void;
    isUpdating: boolean;
    isAdding: boolean;
}

const ColorModal: React.FC<ColorModalProps> = ({
    isOpen, onClose, mode, name, body, door, price, mrp, available,
    existingImages, newPreviews, handleSubmit, setName, setBody, setDoor, setPrice, setMrp, setAvailable,
    handleFileChange, handleExistingImageRemove, handleNewImageRemove, isUpdating, isAdding
}) => (
    <Modal open={isOpen} onClose={onClose} width="max-w-3xl">
        <h2 className="text-lg font-medium text-white text-center mb-4 shadow p-2 bg-gradient-to-r from-default-500 to-default-400 px-5 rounded">
            {mode === "edit" ? "Update Color" : "Add New Color"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <Input label="Color Name" value={name} onChange={e => setName(e.target.value)} required />
                <Input label="Body Color" value={body} onChange={e => setBody(e.target.value)} required />
                <Input label="Door Color" value={door} onChange={e => setDoor(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Price (₹)" type="number" value={price} onChange={e => setPrice(e.target.value ? parseInt(e.target.value) : "")} />
                <Input label="MRP (₹)" type="number" value={mrp} onChange={e => setMrp(e.target.value ? parseInt(e.target.value) : "")} />
            </div>
            <div className="flex items-center gap-2">
                <input id="available" type="checkbox" checked={available} onChange={e => setAvailable(e.target.checked)} />
                <label htmlFor="available" className="text-sm font-medium">Available</label>
            </div>

            {existingImages.length > 0 && (
                <div>
                    <p className="font-medium mb-1">Existing Images</p>
                    <div className="flex flex-wrap gap-2">
                        {existingImages.map((img, idx) => (
                            <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                                <button type="button" className="absolute top-1 right-1 z-10 text-red-500 bg-white rounded-full p-1 shadow" onClick={() => handleExistingImageRemove(img)}>
                                    <FaTimes size={14} />
                                </button>
                                <img src={img} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {newPreviews.length > 0 && (
                <div>
                    <p className="font-medium mb-1">New Images</p>
                    <div className="flex flex-wrap gap-2">
                        {newPreviews.map((img, idx) => (
                            <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
                                <button type="button" className="absolute top-1 right-1 z-10 text-red-500 bg-white rounded-full p-1 shadow" onClick={() => handleNewImageRemove(idx)}>
                                    <FaTimes size={14} />
                                </button>
                                <img src={img} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">Add New Images</label>
                <input type="file" multiple onChange={handleFileChange} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <Button type="button" text="Cancel" bgColor="bg-gray-400 hover:bg-gray-500" onClick={onClose} />
                <Button type="submit" text={isUpdating || isAdding ? "Saving..." : mode === "edit" ? "Update" : "Add"} />
            </div>
        </form>
    </Modal>
);

export default ColorModal;
