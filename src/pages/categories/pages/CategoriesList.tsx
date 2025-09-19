import { useState } from "react";
import Pagination from "@components/Pagination";
import ConfirmModal from "@components/modals/ConfirmModal";
import CreateCategoryModal from "../components/CreateCategoryModal";
import { useCategories } from "@hooks/useCategories";
import CategoriesHeader from "../components/CategoriesHeader";
import CategoriesTable from "../components/CategoriesTable";
;

const CategoriesList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
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
  } = useCategories(search, currentPage, itemsPerPage);

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      {/* Header */}
      <CategoriesHeader
        search={search}
        setSearch={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        onNew={() => {
          setEditData(null);
          setIsModalOpen(true);
        }}
      />

      {/* Table */}
      <CategoriesTable
        categories={categories}
        isLoading={isLoading || isDeleting || isUpdating}
        isError={isError}
        error={error}
        noDataMessage="No categories found"
        onEdit={(id) => {
          const found = categories.find((c) => c._id === id);
          if (found) {
            setEditData(found);
            setIsModalOpen(true);
          }
        }}
        onDelete={(id) => {
          setSelectedId(id);
          setConfirmOpen(true);
        }}
      />

      {/* Pagination */}
      {pagination && (
        <Pagination
          data={categories}
          currentPage={pagination.page}
          itemsPerPage={pagination.limit}
          totalPages={pagination.totalPages}
          isBackendPaging
          onPageChange={(page) => setCurrentPage(page)}
          onLimitChange={(limit) => {
            setItemsPerPage(limit);
            setCurrentPage(1);
          }}
          totalItems={pagination.total}
        />
      )}

      {/* Create/Edit Modal */}
      <CreateCategoryModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        onSubmit={(formData) => handleSubmit(formData, editData)}
        isPending={isCreating || isUpdating}
        defaultValues={editData ?? undefined}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (selectedId) handleDelete(selectedId);
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        isLoading={isDeleting}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CategoriesList;
