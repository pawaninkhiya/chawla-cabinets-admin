import {useCreateCategoriesMutation,useDeleteCategoryMutation,useGetAllCategoriesQuery,useUpdateCategoryMutation,} from "@services/apis/categories/hooks";
import toast from "react-hot-toast";
import { getErrorMessage } from "@utils/getErrorMessage";

export const useCategories = (search: string, page: number, limit: number) => {
    const { data, isLoading, isError, error, refetch } = useGetAllCategoriesQuery({
        search,
        page,
        limit,
    });

    const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategoriesMutation();
    const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategoryMutation();
    const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategoryMutation();

    const categories = data?.categories || [];
    const pagination = data?.pagination;

    const handleSubmit = async (formData: { categoryName: string; description: string }, editData?: any) => {
        try {
            if (editData) {
                await updateCategory({ id: editData._id, payload: formData });
                toast.success("Category updated successfully!");
                
            } else {
                await createCategory(formData);
                toast.success("Category created successfully!");
            }
        } catch (err) {
            getErrorMessage(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id);
            refetch();
            toast.success("Category deleted successfully!");
        } catch (err) {
            getErrorMessage(err);
        }
    };

    return {
        categories,
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
