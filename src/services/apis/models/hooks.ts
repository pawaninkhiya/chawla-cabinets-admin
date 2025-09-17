import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createModel, deleteModel, getAllModels } from "./models";


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