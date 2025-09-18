const TableSkeleton = ({ columns, isSerial }: { columns: any[]; isSerial?: boolean }) => {
  return (
    <div className="relative overflow-x-auto w-full my-4">
      <table className="w-full text-sm text-left text-gray-700 table-auto border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-default-100 text-default-700 uppercase text-xs 2xl:text-sm font-medium">
          <tr>
            {isSerial && <th className="pl-4 pr-4 py-3">S/N</th>}
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr
              key={i}
              className={`animate-pulse ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {isSerial && (
                <td className="pl-4 pr-4 py-3">
                  <div className="h-4 w-6 bg-gray-300 rounded"></div>
                </td>
              )}
              {columns.map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <div
                    className={`h-4 rounded bg-gray-200`}
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
