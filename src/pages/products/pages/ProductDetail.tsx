import { useGetProductByIdQuery } from "@services/apis/products/hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaTimesCircle } from "react-icons/fa";
import ProductDetailSkeleton from "@components/ProductDetailSkeleton";
import ProductHeader from "../components/detail/ProductHeader";
import ProductImages from "../components/detail/ProductImages";
import ProductColors from "../components/detail/ProductColors";
import ProductDetailsSection from "../components/detail/ProductDetailsSection";
import ProductPricing from "../components/detail/ProductPricing";
import ProductCreatedBy from "../components/detail/ProductCreatedBy";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error,refetch } = useGetProductByIdQuery(id ?? "");
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const product = data?.product || {};

    if (isLoading) return <ProductDetailSkeleton />;

    if (error)
        return (
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

    if (!product || Object.keys(product).length === 0)
        return (
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

    const selectedColorPrice = product.colors && product.colors[selectedColorIndex]?.price;
    const selectedColorMRP = product.colors && product.colors[selectedColorIndex]?.mrp;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-default-600 hover:text-default-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-default-50"
                >
                    <FaArrowLeft className="mr-2" /> Back to Products
                </button>
            </div>

            <div className="bg-white shadow rounded-md overflow-hidden border border-gray-100">
                <ProductHeader product={product} />
                <div className="md:flex">
                    <div className="md:w-1/2 p-8">
                        <ProductImages product={product} />
                        <ProductColors
                            product={product}
                            selectedColorIndex={selectedColorIndex}
                            setSelectedColorIndex={setSelectedColorIndex}
                            refetch={refetch}
                        />
                    </div>

                    <div className="md:w-1/2 border-l border-gray-200 bg-gray-50 p-8 relative">
                        <ProductDetailsSection product={product} />
                        <ProductPricing
                            selectedColorPrice={selectedColorPrice}
                            selectedColorMRP={selectedColorMRP}
                            product={product}
                        />
                        <ProductCreatedBy product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
