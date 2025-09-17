import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  isBackendPaging?: boolean;
  data?: any[];
  totalPages?: number;
  currentPage?: number | string;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number | string;
  pageSizeOptions?: number[];
  totalItems?: number;
  onLimitChange?: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  isBackendPaging = false,
  data = [],
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  itemsPerPage = 10,
  pageSizeOptions = [10, 20, 50],
  totalItems,
  onLimitChange,
}) => {
  const safePageSize = Number(itemsPerPage) || 10;
  const safeCurrentPage = Number(currentPage) || 1;

  const [pageSize, setPageSize] = useState(safePageSize);
  const [localPage, setLocalPage] = useState(safeCurrentPage);

  const totalLocalPages = Math.ceil(data.length / pageSize) || 1;
  const actualPage = isBackendPaging ? safeCurrentPage : localPage;
  const isSinglePage = isBackendPaging ? totalPages === 1 : totalLocalPages === 1;

  const handlePageChange = (page: number) => {
    if (isBackendPaging) {
      onPageChange?.(page);
    } else {
      setLocalPage(page);
    }
  };

  const goToFirst = () => handlePageChange(1);
  const goToLast = () => handlePageChange(isBackendPaging ? totalPages : totalLocalPages);
  const goToPrev = () => handlePageChange(Math.max(1, actualPage - 1));
  const goToNext = () => handlePageChange(Math.min(isBackendPaging ? totalPages : totalLocalPages, actualPage + 1));

  const renderPaginationNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxPages = isBackendPaging ? totalPages : totalLocalPages;

    for (let i = 1; i <= maxPages; i++) {
      if (i === 1 || i === maxPages || (i >= actualPage - 1 && i <= actualPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <AnimatePresence>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="px-3 py-1 text-gray-200 select-none">
              ...
            </span>
          ) : (
            <motion.button
              key={`page-${page}-${index}`}
              onClick={() => handlePageChange(page)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-3 py-1 border border-transparent text-sm 2xl:text-sm ${
                actualPage === page
                  ? "bg-white text-default-500 border-transparent"
                  : "bg-white/20 text-white hover:bg-white/30 border-transparent"
              } transition-colors duration-300 ease-in-out ${
                isSinglePage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
              disabled={isSinglePage}
            >
              {page}
            </motion.button>
          )
        )}
      </AnimatePresence>
    );
  };

  // Sync local page with parent currentPage
  useEffect(() => {
    setLocalPage(safeCurrentPage);
  }, [safeCurrentPage]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-md rounded-tl-md shadow-sm bg-gradient-to-r from-default-500 to-default-400">
      {/* Page size selector */}
      <div className="mb-2 lg:mb-0 text-white">
        <label htmlFor="pageSize" className="mr-2 text-sm font-medium">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            const newLimit = Number(e.target.value);
            setPageSize(newLimit);
            onLimitChange?.(newLimit);
            onPageChange?.(1); // reset page to 1 when changing limit
          }}
          className="border border-white/40 rounded px-3 py-1 text-sm cursor-pointer text-gray-600 bg-white ring-0 focus:ring-0 focus:border-none focus:outline-none appearance-none"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination controls */}
      <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={goToFirst}
          disabled={actualPage === 1 || isSinglePage}
          className={`px-3 py-1 rounded-l-md text-white hover:bg-white/20 ${
            actualPage === 1 || isSinglePage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {"<<"}
        </button>
        <button
          onClick={goToPrev}
          disabled={actualPage === 1 || isSinglePage}
          className={`px-3 py-1 text-white hover:bg-white/20 ${
            actualPage === 1 || isSinglePage ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {"<"}
        </button>
        {renderPaginationNumbers()}
        <button
          onClick={goToNext}
          disabled={actualPage === (isBackendPaging ? totalPages : totalLocalPages) || isSinglePage}
          className={`px-3 py-1 text-white hover:bg-white/20 ${
            actualPage === (isBackendPaging ? totalPages : totalLocalPages) || isSinglePage
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {">"}
        </button>
        <button
          onClick={goToLast}
          disabled={actualPage === (isBackendPaging ? totalPages : totalLocalPages) || isSinglePage}
          className={`px-3 py-1 rounded-r-md text-white hover:bg-white/20 ${
            actualPage === (isBackendPaging ? totalPages : totalLocalPages) || isSinglePage
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {">>"}
        </button>
      </nav>

      {/* Page info */}
      <div className="mt-2 lg:mt-0 text-sm text-white">
        Showing <span className="font-medium">{(actualPage - 1) * pageSize + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(
            actualPage * pageSize,
            isBackendPaging ? totalItems ?? totalPages * pageSize : data.length
          )}
        </span>{" "}
        of <span className="font-medium">{isBackendPaging ? totalItems ?? "many" : data.length}</span> results
      </div>
    </div>
  );
};

export default Pagination;
