import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "./products";
import type { ProductsParams } from "@interfaces/productsTypes";

// ---------------- CREATE PRODUCT ----------------
export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: createProduct,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["products"] });
    // },
  });
};

// ---------------- GET ALL PRODUCTS ----------------
export const useGetAllProductsQuery = (params?: ProductsParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getAllProducts(params),
  });
};
