import {
    useCreateModelsMutation,
    useDeleteModelMutation,
    useGetAllModelsQuery,
    useUpdateModelMutation,
} from "@services/apis/models/hooks";
import toast from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";

export const useModels = (search: string, page: number, limit: number) => {
    const { data, isLoading, isError, error, refetch } = useGetAllModelsQuery({
        search,
        page,
        limit,
    });

    const { mutateAsync: createModel, isPending: isCreating } = useCreateModelsMutation();
    const { mutateAsync: deleteModel, isPending: isDeleting } = useDeleteModelMutation();
    const { mutateAsync: updateModel, isPending: isUpdating } = useUpdateModelMutation();

    const models = data?.modelVerities || []; // 👈 match backend response
    const pagination = data?.pagination;

    const handleSubmit = async (formData: { name: string; description?: string; categoryId: string }, editData?: any) => {
        try {
            if (editData) {
                await updateModel({ id: editData._id, payload: formData });
                toast.success("Model updated successfully!");
            } else {
                await createModel(formData);
                toast.success("Model created successfully!");
            }
        } catch (err) {
            getErrorMessage(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteModel(id);
            refetch();
            toast.success("Model deleted successfully!");
        } catch (err) {
            getErrorMessage(err);
        }
    };

    return {
        models,
        pagination,
        isLoading,
        isError,
        error,
        isCreating,
        isDeleting,
        isUpdating,
        handleSubmit,
        handleDelete,
    };
};
