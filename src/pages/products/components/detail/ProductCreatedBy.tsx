const ProductCreatedBy = ({ product }: any) => (
    <div className="mb-8">
        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
            <div className="mb-4">
                <span className="text-sm text-gray-500 block mb-1">Created By:</span>
                <p className="font-semibold text-gray-900 text-sm">{product?.createdBy?.name || 'N/A'}</p>
            </div>
            <div className="mb-4">
                <span className="text-sm text-gray-500 block mb-1">Created At:</span>
                <p className="font-semibold text-gray-900 text-sm">{product?.createdAt ? new Date(product.createdAt).toLocaleString() : '-'}</p>
            </div>
            <div>
                <span className="text-sm text-gray-500 block mb-1">Last Updated:</span>
                <p className="font-semibold text-gray-900 text-sm">{product?.updatedAt ? new Date(product.updatedAt).toLocaleString() : '-'}</p>
            </div>
        </div>
    </div>
);

export default ProductCreatedBy;
