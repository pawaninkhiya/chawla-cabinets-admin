import { useState } from "react";
import Pagination from "@components/Pagination";
import Table from "@components/Table";
import { useGetAllProductsQuery } from "@services/apis/products/hooks";
import { getErrorMessage } from "@utils/getErrorMessage";

import type { Column } from "@components/Table";
import type { Product } from "@interfaces/productsTypes";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetAllProductsQuery({
        page: currentPage,
        limit: itemsPerPage,
    });

    return (
        <div className="p-4 bg-white rounded-lg shadow space-y-4">
            <Table
                data={data?.products}
                columns={columns}
                isSerial
                onRowClick={(row) => navigate(`/products/${row._id}`)}
                isLoading={isLoading}
                errorMessage={getErrorMessage(error ?? null)}
                getRowId={(row) => row._id}

            />

            {/* Pagination */}
            {data?.pagination && (
                <Pagination
                    data={data.products}
                    currentPage={data.pagination.page}
                    itemsPerPage={data.pagination.limit}
                    totalPages={data.pagination.totalPages}
                    isBackendPaging
                    onPageChange={(page) => setCurrentPage(page)}
                    onLimitChange={(limit) => {
                        setItemsPerPage(limit);
                        setCurrentPage(1);
                    }}
                    totalItems={data.pagination.total}
                />
            )}
        </div>
    );
};

export default ProductsList;
const columns: Column<Product>[] = [
    {
        header: "Image", accessor: "cardImage", cell: (row) => (
            <img
                src={row.cardImage}
                alt={row.name}
                className="w-12 h-12 object-cover rounded"
            />
        )
    },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description", cell: (row) => <div className=" max-w-64 truncate"><span className="truncate">{row.description}</span> || "N/A"</div> },
    { header: "Category", accessor: "categoryId", cell: (row) => row.categoryId?.categoryName || "—" },
    { header: "Model", accessor: "modelId", cell: (row) => row.modelId?.name || "—" },
    { header: "Price", accessor: "price", cell: (row) => `₹${row.price}` },
    { header: "MRP", accessor: "mrp", cell: (row) => `₹${row.mrp}` },
    { header: "Number of Doors", accessor: "numberOfDoors" },
];
