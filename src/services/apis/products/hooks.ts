import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProductColorOption,
  createProduct,
  getAllProducts,
  getProductById,
  updateProductColorOption,
  updateProductColorImagesOrder,
  deleteProduct,
  updateProductApi
} from "./products";
import type { ProductsParams } from "@interfaces/productsTypes";

// ------------------ Product Hooks ------------------

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

// Update product 
export const useUpdateProductMutation = () =>
    useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<any> }) =>
            updateProductApi(id, payload),
    });

// Delete product
export const useDeleteProductMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};

// ------------------ Product Color Hooks ------------------

// Add new color option
export const useAddProductColorOptionMutation = () => {
  return useMutation({
    mutationFn: ({ productId, payload }: { productId: string; payload: FormData }) =>
      addProductColorOption(productId, payload),
  });
};

// Update color option (fields, add/remove images)
export const useUpdateProductColorOptionMutation = () => {
  return useMutation({
    mutationFn: ({ productId, colorId, payload }: { productId: string; colorId: string; payload: FormData }) =>
      updateProductColorOption(productId, colorId, payload),
  });
};

// Update color images order
export const useUpdateProductColorImagesOrderMutation = () => {
  return useMutation({
    mutationFn: ({ productId, colorId, newOrder }: { productId: string; colorId: string; newOrder: string[] }) =>
      updateProductColorImagesOrder(productId, colorId, newOrder),
  });
};
