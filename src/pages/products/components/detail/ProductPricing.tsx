import { FaTag } from "react-icons/fa";

const ProductPricing = ({ selectedColorPrice, selectedColorMRP, product }: any) => (
    <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaTag className="mr-2 text-default-600" /> Pricing
        </h3>
        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
            <div className="flex justify-between mb-3">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-semibold text-gray-900 text-sm">
                    ₹{selectedColorPrice?.toLocaleString() || product?.price?.toLocaleString() || '0'}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm text-gray-600">MRP:</span>
                <span className="font-semibold text-gray-900 text-sm">
                    ₹{selectedColorMRP?.toLocaleString() || product?.mrp?.toLocaleString() || '0'}
                </span>
            </div>
        </div>
    </div>
);

export default ProductPricing;
