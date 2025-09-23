interface PriceDisplayProps {
    price?: number;
    mrp?: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, mrp }) => (
    <div className="text-center text-sm text-gray-700 border rounded-md p-2 mb-2">
        <div className="text-xs font-medium text-gray-500 mb-1">Price / MRP</div>
        <div className="whitespace-nowrap">
            <span className="font-semibold text-green-600">₹{price}</span> / <span className="text-gray-500">₹{mrp}</span>
        </div>
    </div>
);

export default PriceDisplay;
