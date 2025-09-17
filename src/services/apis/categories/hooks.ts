// hooks/useCategories.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory, getAllCategories, getCategoryOptions, } from "./categories";

// ---------------- GET ALL CATEGORIES ----------------

export const useGetAllCategoriesQuery = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getAllCategories(params),
  });
};

// ---------------- CREATE CATEGORY ----------------

export const useCreateCategoriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-options"] });
    },
  });
};

// ---------------- GET CATEGORY OPTIONS ----------------

export const useGetCategoryOptionsQuery = () => {
  return useQuery({
    queryKey: ["category-options"],
    queryFn: getCategoryOptions,
  });
};


// ---------------- DELETE Category ----------------
export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["models"] });
        },
    });
};