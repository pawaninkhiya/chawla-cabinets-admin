import { useState } from "react";
import type { Column } from "@components/Table";
import Table from "@components/Table";
import Pagination from "@components/Pagination";
import { useCreateModelsMutation, useDeleteModelMutation, useGetAllModelsQuery } from "@services/apis/models/hooks";
import type { Model } from "@interfaces/modelsTypes";
import SearchInput from "@components/ui/SearchInput";
import Button from "@components/ui/Button";
import { IoAdd } from "react-icons/io5";
import CreateModelModalModal from "../components/CreateModelModal";
import toast from "react-hot-toast";
import ConfirmModal from "@components/modals/ConfirmModal";

const ModelsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetAllModelsQuery({
    search,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { mutateAsync: deleteModel, isPending: isDeleting } = useDeleteModelMutation();
  const { mutateAsync: createModel, isPending: isCreating } = useCreateModelsMutation();

  const models: Model[] = data?.modelVerities || [];
  const pagination = data?.pagination;

  const columns: Column<Model>[] = [
    { header: "Name", accessor: "name" },
    {
      header: "Description",
      accessor: "description",
      cell: (row) => row.description || "N/A",
    },
    {
      header: "Category",
      accessor: "categoryId",
      cell: (row) => row.categoryId?.categoryName || "—",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const handleCreateModel = async (data: { name: string; description?: string; categoryId: string }) => {
    try {
      await createModel(data);
      setIsModalOpen(false);
      refetch();
      toast.success("Model created successfully!");
    } catch (err) {
      console.error("Failed to create model:", err);
      toast.error("Failed to create model. Please try again.");
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDeleteModel = async () => {
    if (!selectedId) return;
    try {
      await deleteModel(selectedId);
      refetch();
      toast.success("Model deleted successfully!");
    } catch (err) {
      console.error("Failed to delete model:", err);
      toast.error("Failed to delete model. Please try again.");
    } finally {
      setConfirmOpen(false);
      setSelectedId(null);
    }
  };

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
          placeholder="Search models"
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
        data={models}
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
          data={models}
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

      {/* Create Model Modal */}
      <CreateModelModalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateModel}
        isPending={isCreating}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteModel}
        isLoading={isDeleting}
        title="Delete Model"
        message="Are you sure you want to delete this model? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ModelsList;
