import type { Column } from "@components/Table";
import Table from "@components/Table";
import type { Category } from "@interfaces/categoriesTypes";
import { getErrorMessage } from "@utils/getErrorMessage";

interface Props {
    categories: Category[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    noDataMessage?: string;
}

const columns: Column<Category>[] = [
    { header: "Name", accessor: "categoryName" },
    { header: "Description", accessor: "description" },
    {
        header: "Created At",
        accessor: "createdAt",
        cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
];

const CategoriesTable = ({ categories, isLoading, isError, error, onEdit, onDelete, noDataMessage }: Props) => (
    <Table
        data={categories}
        columns={columns}
        getRowId={(row) => row._id}
        isSerial
        onDelete={onDelete}
        onEdit={onEdit}
        onRowClick={(row) => console.log("Clicked row:", row)}
        isLoading={isLoading}
        errorMessage={getErrorMessage(error ?? null)}
        isError={isError}
        noDataMessage={noDataMessage}
    />
);

export default CategoriesTable;
