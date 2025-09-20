import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "./products";

// ---------------- CREATE PRODUCT ----------------
export const useCreateProductMutation = () => {
//   const queryClient = useQueryClientt();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
