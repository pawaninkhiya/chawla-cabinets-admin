import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createModel, deleteModel, getAllModels, getModelsOptions, updateModel } from "./models";
import type { ModelPayload } from "@interfaces/modelsTypes";


export const useGetAllModelsQuery = (params?: { search?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["models", params],
    queryFn: () => getAllModels(params),
  });
};

// ---------------- CREATE CATEGORY ----------------

export const useCreateModelsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] })
    },
  });

};

// ---------------- UPDATE Category ----------------

// ---------------- UPDATE MODEL ----------------
export const useUpdateModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ModelPayload> }) =>
      updateModel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};
export const useGetModelOptionsQuery = (categoryId: string) => {
  return useQuery({
    queryKey: ["model-options", categoryId],
    queryFn: () => getModelsOptions(categoryId),
    enabled: !!categoryId, // ✅ only runs if categoryId is truthy
  });
};
// ---------------- DELETE MODEL ----------------
export const useDeleteModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });
};