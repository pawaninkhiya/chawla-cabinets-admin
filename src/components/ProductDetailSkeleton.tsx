const ProductDetailSkeleton = () => {
    return (
        <div className="w-full animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
            </div>

            <div className="bg-white shadow rounded-md overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="px-8 py-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-gray-200 rounded"></div>
                            <div className="h-4 w-96 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="md:flex">
                    {/* Left Column - Images & Colors */}
                    <div className="md:w-1/2 p-8 space-y-6">
                        {/* Product Image */}
                        <div className="mb-8">
                            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                            <div className="rounded-xl mt-5 overflow-hidden h-96 bg-gray-100 flex items-center justify-center"></div>
                        </div>

                        {/* Color Options */}
                        <div className="space-y-4">
                            <div className="h-6 w-44 bg-gray-200 rounded mb-4"></div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                            </div>

                            {/* Selected Color Images & Price */}
                            <div className="space-y-4">
                                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="h-48 bg-gray-100 rounded-lg"></div>
                                    <div className="h-48 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="md:w-1/2 border-l border-gray-200 bg-gray-50 p-8 space-y-6">
                        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-md shadow-sm border border-gray-100 space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                </div>
                            ))}
                        </div>

                        {/* Pricing */}
                        <div className="space-y-2">
                            <div className="h-6 w-28 bg-gray-200 rounded mb-2"></div>
                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100 space-y-2">
                                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        {/* Created By */}
                        <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100 space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                            <div className="h-4 w-28 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
