import { useGetProductByIdQuery } from "@services/apis/products/hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
    FaArrowLeft, FaTag, FaBox, FaPalette,
    FaDoorClosed, FaShieldAlt, FaImage,
    FaCheckCircle, FaTimesCircle, 
} from "react-icons/fa";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useGetProductByIdQuery(id ?? "");
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    let product = data?.product || {};

    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-default-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-4xl mx-auto mt-8">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FaTimesCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Failed to load product details</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p>Please try refreshing the page or check your connection.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!product || Object.keys(product).length === 0) return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 max-w-4xl mx-auto mt-8">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FaTimesCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Product not found</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>The product you're looking for doesn't exist or may have been removed.</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Determine price & MRP based on selected color
    const selectedColorPrice = product.colors && product.colors[selectedColorIndex]?.price;
    const selectedColorMRP = product.colors && product.colors[selectedColorIndex]?.mrp;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-default-600 hover:text-default-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-default-50"
                >
                    <FaArrowLeft className="mr-2" /> Back to Products
                </button>
            </div>

            <div className="bg-white shadow rounded-md overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="px-8 py-6 border-b border-gray-200 ">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">{product?.name}</h1>
                            <p className="mt-2 text-gray-600 max-w-3xl">{product?.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 md:mt-0">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${product?.colorsAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product?.colorsAvailable ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                                {product?.colorsAvailable ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:flex">
                    {/* Left Column - Images & Colors */}
                    <div className="md:w-1/2 p-8">
                        {/* Product Image */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaImage className="mr-2 text-default-600" /> Product Image
                            </h2>
                            <div className="rounded-xl overflow-hidden h-96 flex items-center justify-center shadow-inner border border-gray-200">
                                {product?.cardImage ? (
                                    <img
                                        src={product?.cardImage}
                                        alt={product?.name}
                                        className="object-contain h-full w-full p-4"
                                    />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center">
                                        <FaImage className="h-16 w-16" />
                                        <p className="mt-2 text-sm">No image available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Color Options */}
                        {product?.colors && product.colors.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaPalette className="mr-2 text-default-600" /> Color Options
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    {product.colors.map((color: any, index: number) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div
                                                className={`w-12 h-12 rounded-full border border-gray-300 shadow-sm cursor-pointer ${selectedColorIndex === index ? 'ring-2 ring-offset-2 ring-default-500' : ''}`}
                                                style={{ backgroundColor: color?.body }}
                                                title={color?.name}
                                                onClick={() => setSelectedColorIndex(index)}
                                            ></div>
                                            <span className="text-xs mt-1">{color?.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Selected Color Images & Price */}
                                {product.colors[selectedColorIndex] && (
                                    <div className="mt-6">
                                        {/* Selected Color Name + Price & MRP */}
                                        <div className="mb-4 bg-white border border-gray-200 rounded-md p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-br from-default-100-100 to-default-300">
                                            <h3 className="text-gray-800 font-semibold text-sm">
                                                {product.colors[selectedColorIndex].name}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500 text-sm">Price:</span>
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        ₹{product.colors[selectedColorIndex].price?.toLocaleString() || '0'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="text-gray-500 text-sm">MRP:</span>
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        ₹{product.colors[selectedColorIndex].mrp?.toLocaleString() || '0'}
                                                    </span>
                                                </div>
                                                {product.colors[selectedColorIndex].available === false && (
                                                    <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Selected Color Images */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {product.colors[selectedColorIndex].images.map((image: string, imgIndex: number) => (
                                                <div key={imgIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                                                    <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                                                        <img
                                                            src={image}
                                                            alt={`${product.colors[selectedColorIndex].name} ${imgIndex + 1}`}
                                                            className="object-contain h-full w-full"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                    {/* Right Column - Details */}
                    <div className="md:w-1/2 border-l border-gray-200 bg-gray-50 p-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <FaBox className="mr-2 text-default-600" /> Product Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaTag className="mr-2" />
                                    <span>Category</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{product?.categoryId?.categoryName || 'N/A'}</p>
                            </div>
                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaTag className="mr-2" />
                                    <span>Model</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{product?.modelId?.name || 'N/A'}</p>
                            </div>

                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaDoorClosed className="mr-2" />
                                    <span>Number of Doors</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{product?.numberOfDoors || 'N/A'}</p>
                            </div>

                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaPalette className="mr-2" />
                                    <span>Color Options</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{product?.colorOptionsCount || (product.colors ? product.colors.length : 0)}</p>
                            </div>

                            <div className="bg-white p-5 rounded-md shadow-sm border border-gray-100">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaShieldAlt className="mr-2" />
                                    <span>Warranty</span>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">{product?.warranty || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Pricing */}
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

                        {/* Created By */}
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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
