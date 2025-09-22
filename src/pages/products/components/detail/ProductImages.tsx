import { FaImage } from "react-icons/fa";
import { VscEdit } from "react-icons/vsc";

const ProductImages = ({ product }: any) => (
    <div className="mb-8 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaImage className="mr-2 text-default-600" /> Product Image
        </h2>
        <button className="absolute top-0 right-0 mt-2 mr-2 text-xs bg-default-100 text-default-700 hover:bg-default-200 px-3 py-2 cursor-pointer rounded-md flex items-center shadow-sm transition-colors">
            <VscEdit />
        </button>
        <div className="rounded-xl mt-5 overflow-hidden h-96 flex items-center justify-center shadow-inner border border-gray-200">
            {product?.cardImage ? (
                <img src={product.cardImage} alt={product.name} className="object-contain h-full w-full p-4" />
            ) : (
                <div className="text-gray-400 flex flex-col items-center">
                    <FaImage className="h-16 w-16" />
                    <p className="mt-2 text-sm">No image available</p>
                </div>
            )}
        </div>
    </div>
);

export default ProductImages;
