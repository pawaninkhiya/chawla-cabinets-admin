import { FaBox, FaTag, FaDoorClosed, FaPalette, FaShieldAlt } from "react-icons/fa";

const ProductDetailsSection = ({ product }: any) => (
    <>
        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
            <FaBox className="mr-2 text-default-600" /> Product Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <DetailCard icon={<FaTag />} label="Category" value={product?.categoryId?.categoryName || 'N/A'} />
            <DetailCard icon={<FaTag />} label="Model" value={product?.modelId?.name || 'N/A'} />
            <DetailCard icon={<FaDoorClosed />} label="Number of Doors" value={product?.numberOfDoors || 'N/A'} />
            <DetailCard icon={<FaPalette />} label="Color Options" value={product?.colorOptionsCount || (product.colors ? product.colors.length : 0)} />
            <DetailCard icon={<FaShieldAlt />} label="Warranty" value={product?.warranty || 'N/A'} />
        </div>
    </>
);

const DetailCard = ({ icon, label, value }: any) => (
    <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
        <div className="flex items-center text-sm text-gray-500 mb-2">
            {icon}
            <span className="ml-2">{label}</span>
        </div>
        <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
);

export default ProductDetailsSection;
