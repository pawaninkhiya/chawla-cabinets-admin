import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts, getProductById } from "./products";
import type { ProductsParams } from "@interfaces/productsTypes";

// Create product
export const useCreateProductMutation = () => {
  return useMutation({ mutationFn: createProduct });
};

// Get all products
export const useGetAllProductsQuery = (params?: ProductsParams) => {
  return useQuery({ queryKey: ["products", params], queryFn: () => getAllProducts(params) });
};

// Get product by ID
export const useGetProductByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
