import { MdErrorOutline, MdOutlineFolderOff } from "react-icons/md";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import TableSkeleton from "./TableSkeleton";

export interface Column<T> {
    header: string;
    accessor: keyof T | string;
    cell?: (row: T, index?: number) => React.ReactNode;
    className?: string;
    onClickCell?: (row: T, e: React.MouseEvent) => void;
    isColWrap?: boolean;
}

interface TableProps<T> {
    data: T[] | undefined;
    columns: Column<T>[];
    onEdit?: (id: string | number | any) => void;
    onDelete?: (id: string | number | any) => void;
    onView?: (id: string | number | any, row?: any) => void;
    getRowId: (row: T) => string | number;
    onRowClick?: (row: T) => void;
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    noDataMessage?: string;
    isSerial?: boolean;
}

const Table = <T,>({
    data,
    columns,
    onEdit,
    onDelete,
    onView,
    getRowId,
    onRowClick,
    isLoading,
    isError,
    errorMessage,
    noDataMessage = "No data found.",
    isSerial,
}: TableProps<T>) => {
    const fadeInProps = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.4 },
    };

    if (isLoading) {
        return <TableSkeleton columns={columns} isSerial={isSerial} />;
    }

    if (isError) {
        return (
            <motion.div
                {...fadeInProps}
                className="flex flex-col h-[150px] xl:h-[200px] items-center justify-center py-10 bg-red-50 text-gray-600 rounded-lg shadow-sm mt-4"
            >
                <MdErrorOutline size={40} className="mb-2 text-red-400" />
                <p className="text-sm md:text-lg font-semibold text-red-500">
                    {errorMessage || "Something went wrong"}
                </p>
            </motion.div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <motion.div
                {...fadeInProps}
                className="flex flex-col h-[150px] xl:h-[200px] items-center justify-center py-10 bg-default-50 text-default-600 rounded-lg shadow-sm mt-4"
            >
                <MdOutlineFolderOff size={40} className="mb-2" />
                <p className="text-sm md:text-lg font-semibold">{noDataMessage}</p>
                <p className="text-xs sm:text-sm text-gray-400">
                    No results found. Please try again
                </p>
            </motion.div>
        );
    }

    return (
        <div className="relative overflow-x-auto w-full my-4 scroll-hidden">
            <table className="w-full text-sm text-left text-gray-700 table-auto">
                <thead className="bg-default-100 text-default-700 uppercase text-xs 2xl:text-sm font-medium">
                    <motion.tr>
                        {isSerial && (
                            <th className="pl-4 pr-4 py-3 rounded-l-lg">S/N</th>
                        )}
                        {columns.map((col, idx) => {
                            const isFirst = !isSerial && idx === 0;
                            const isLast = idx === columns.length - 1 && !(onView || onEdit || onDelete);
                            return (
                                <th
                                    key={idx}
                                    className={`px-4 py-3 whitespace-nowrap ${col.className ?? ""} 
                    ${isSerial && idx === 0 ? "" : isFirst ? "rounded-l-lg" : ""}
                    ${isLast ? "rounded-r-lg" : ""}
                  `}
                                >
                                    {col.header}
                                </th>
                            );
                        })}
                        {(onView || onEdit || onDelete) && (
                            <th className="px-4 py-3 rounded-r-lg">Actions</th>
                        )}
                    </motion.tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => {
                        const id = getRowId(row);
                        return (
                            <motion.tr
                                key={id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 70,
                                    delay: rowIndex * 0.05,
                                }}
                                className={`cursor-pointer ${rowIndex % 2 === 0 ? "bg-white" : "bg-default-50"
                                    } hover:bg-default-100 transition-colors`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRowClick?.(row);
                                }}
                            >
                                {isSerial && (
                                    <td className="pl-4 pr-4 py-3 rounded-l-lg">{rowIndex + 1}</td>
                                )}
                                {columns.map((col, colIndex) => {
                                    const isFirst = !isSerial && colIndex === 0;
                                    const isLast = colIndex === columns.length - 1 && !onEdit && !onDelete;
                                    return (
                                        <td
                                            key={colIndex}
                                            className={`px-4 py-3 ${col.isColWrap ? "whitespace-normal" : "whitespace-nowrap"
                                                } ${col.className ?? ""} 
                        ${isSerial && colIndex === 0 ? "" : isFirst ? "rounded-l-lg" : ""}
                        ${isLast ? "rounded-r-lg" : ""}
                      `}
                                            {...(col.onClickCell
                                                ? {
                                                    onClick: (e) => {
                                                        e.stopPropagation();
                                                        col.onClickCell?.(row, e);
                                                    },
                                                    style: { cursor: "pointer" },
                                                }
                                                : {})}
                                        >
                                            {col.cell ? col.cell(row, rowIndex) : String(row[col.accessor as keyof T])}
                                        </td>
                                    );
                                })}
                                {(onView || onEdit || onDelete) && (
                                    <td
                                        className="px-4 py-3 rounded-r-lg"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ActionButtons
                                            id={id}
                                            onView={onView}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                            row={row}
                                        />
                                    </td>
                                )}
                            </motion.tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
