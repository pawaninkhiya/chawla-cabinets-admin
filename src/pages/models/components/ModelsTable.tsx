import type { Column } from "@components/Table";
import Table from "@components/Table";
import type { Model } from "@interfaces/modelsTypes";
import { getErrorMessage } from "@utils/getErrorMessage";

interface Props {
    models: Model[];
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    noDataMessage?: string;
}

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
const ModelsList = ({ models, isLoading, isError, error, onEdit, onDelete, noDataMessage }: Props) => (
    <Table
        data={models}
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

export default ModelsList;
