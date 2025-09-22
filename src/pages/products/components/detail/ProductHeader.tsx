import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ProductHeader = ({ product }: any) => (
    <div className="px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">{product?.name}</h1>
                <p className="mt-2 text-gray-600 max-w-3xl">{product?.description}</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${product?.colorsAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product?.colorsAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
                    {product?.colorsAvailable ? 'Available' : 'Out of Stock'}
                </span>
            </div>
        </div>
    </div>
);

export default ProductHeader;
