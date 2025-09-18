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

// import { useState } from "react";
// import type { Column } from "@components/Table";
// import Table from "@components/Table";
// import Pagination from "@components/Pagination";
// import { useCreateCategoriesMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "@services/apis/categories/hooks";
// import type { Category } from "@interfaces/categoriesTypes";
// import SearchInput from "@components/ui/SearchInput";
// import Button from "@components/ui/Button";
// import { IoAdd } from "react-icons/io5";
// import CreateCategoryModal from "../components/CreateCategoryModal";
// import toast from "react-hot-toast";
// import ConfirmModal from "@components/modals/ConfirmModal";
// import { getErrorMessage } from "@utils/getErrorMessage";

// const CategoriesList = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [editData, setEditData] = useState<Category | null>(null);

//   const { data, isLoading, isError, error, refetch } = useGetAllCategoriesQuery({
//     search,
//     page: currentPage,
//     limit: itemsPerPage,
//   });

//   const { mutateAsync: createCategory, isPending } = useCreateCategoriesMutation();
//   const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategoryMutation();
//   const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategoryMutation();

//   const categories: Category[] = data?.categories || [];
//   const pagination = data?.pagination;

//   //  Handle create/update
//   const handleSubmitCategory = async (formData: { categoryName: string; description: string }) => {
//     try {
//       if (editData) {
//         await updateCategory({ id: editData._id, payload: formData });
//         toast.success("Category updated successfully!");
//       } else {
//         await createCategory(formData);
//         toast.success("Category created successfully!");
//       }
//       setIsModalOpen(false);
//       setEditData(null);
//     } catch (err) {
//       getErrorMessage(err)
//     }
//   };


//   const confirmDelete = (id: string) => {
//     setSelectedId(id);
//     setConfirmOpen(true);
//   };

//   const handleDeleteCategory = async () => {
//     if (!selectedId) return;
//     try {
//       await deleteCategory(selectedId);
//       refetch();
//       toast.success("Category deleted successfully!");
//     } catch (err) {
//       getErrorMessage(err)
//     } finally {
//       setConfirmOpen(false);
//       setSelectedId(null);
//     }
//   };

//   const columns: Column<Category>[] = [
//     { header: "Name", accessor: "categoryName" },
//     { header: "Description", accessor: "description" },
//     {
//       header: "Created At",
//       accessor: "createdAt",
//       cell: (row) => new Date(row.createdAt).toLocaleDateString(),
//     },
//   ];

//   return (
//     <div className="p-4 bg-white rounded-lg shadow space-y-4">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow p-4 rounded-md border border-gray-100">
//         <SearchInput
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
//           placeholder="Search categories"
//           width="w-full md:max-w-xs"
//         />

//         <Button
//           text="New"
//           icon={<IoAdd size={22} />}
//           onClick={() => { setEditData(null); setIsModalOpen(true)}}
//         />
//       </div>

//       {/* Table */}
//       <Table
//         data={categories || []}
//         columns={columns}
//         getRowId={(row) => row._id}
//         isSerial
//         onDelete={confirmDelete}
//         onEdit={(_id) => {
//           const found = categories.find((val) => val._id === _id);
//           if (found) {
//             setEditData(found);
//             setIsModalOpen(true);
//           }
//         }}
//         onRowClick={(row) => console.log("Clicked row:", row)}
//         isLoading={isLoading || isDeleting || isUpdating}
//         errorMessage={getErrorMessage(error ?? null)}
//         isError={isError}
//         noDataMessage={data?.message}
//       />

//       {/* Pagination */}
//       {pagination && (
//         <Pagination
//           data={categories}
//           currentPage={pagination.page}
//           itemsPerPage={pagination.limit}
//           totalPages={pagination.totalPages}
//           isBackendPaging={true}
//           onPageChange={(page) => setCurrentPage(page)}
//           onLimitChange={(limit) => {
//             setItemsPerPage(limit);
//             setCurrentPage(1);
//           }}
//           totalItems={pagination.total}
//         />
//       )}

//       {/* Create/Edit Category Modal */}
//       <CreateCategoryModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setEditData(null);
//         }}
//         onSubmit={handleSubmitCategory}
//         isPending={isPending || isUpdating}
//         defaultValues={editData ?? undefined}
//       />

//       {/* Confirm Delete Modal */}
//       <ConfirmModal
//         open={confirmOpen}
//         onCancel={() => setConfirmOpen(false)}
//         onConfirm={handleDeleteCategory}
//         isLoading={isDeleting}
//         title="Delete Category"
//         message="Are you sure you want to delete this category? This action cannot be undone."
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };

// export default CategoriesList;
