import { useState } from "react";
import type { Column } from "@components/Table";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import {
  useCreateCategoriesMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@services/apis/categories/hooks";
import type { Category } from "@interfaces/categoriesTypes";
import SearchInput from "@components/ui/SearchInput";
import Button from "@components/ui/Button";
import { IoAdd } from "react-icons/io5";
import CreateCategoryModal from "../components/CreateCategoryModal";
import toast from "react-hot-toast";
import ConfirmModal from "@components/modals/ConfirmModal";

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllCategoriesQuery(
    {
      search,
      page: currentPage,
      limit: itemsPerPage,
    }
  );

  const { mutateAsync, isPending } = useCreateCategoriesMutation();
  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategoryMutation();

  const categories: Category[] = data?.categories || [];
  const pagination = data?.pagination;

  const handleCreateCategory = async (data: {
    categoryName: string;
    description: string;
  }) => {
    try {
      await mutateAsync(data);
      setIsModalOpen(false);
      refetch();
      toast.success("Category created successfully!");
    } catch (err) {
      console.error("Failed to create category:", err);
      toast.error("Failed to create category. Please try again.");
    }
  };

  // ✅ Confirm delete flow
  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (!selectedId) return;
    try {
      await deleteCategory(selectedId);
      refetch();
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Failed to delete category:", err);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

  const columns: Column<Category>[] = [
    { header: "Name", accessor: "categoryName" },
    { header: "Description", accessor: "description" },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow p-4 rounded-md border border-gray-100">
        <SearchInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search categories"
          width="w-full md:max-w-xs"
        />

        <Button
          text="New"
          icon={<IoAdd size={22} />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Table */}
      <Table
        data={categories}
        columns={columns}
        getRowId={(row) => row._id}
        isSerial
        onDelete={confirmDelete} // ✅ ask confirmation before deleting
        onRowClick={(row) => console.log("Clicked row:", row)}
        isLoading={isLoading || isDeleting}
        errorMessage={error?.message}
        isError={isError}
      />

      {/* Pagination */}
      {pagination && (
        <Pagination
          data={categories}
          currentPage={pagination.page}
          itemsPerPage={pagination.limit}
          totalPages={pagination.totalPages}
          isBackendPaging={true}
          onPageChange={(page) => setCurrentPage(page)}
          onLimitChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
          totalItems={pagination.total}
        />
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCategory}
        isPending={isPending}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteCategory}
        isLoading={isDeleting}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default List;
