interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageWindowSize?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageWindowSize = 12,
}: PaginationProps) => {
  const windowStart =
    Math.floor((currentPage - 1) / pageWindowSize) * pageWindowSize + 1;
  const windowEnd = Math.min(windowStart + pageWindowSize - 1, totalPages);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center overflow-x-auto m-4 sm:m-8 px-2 sm:px-0">
      <div className="flex space-x-1 sm:space-x-2 whitespace-nowrap">
        <button
          className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 transition ${
            currentPage > 1 ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Prev
        </button>

        {Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => {
          const page = i + windowStart;
          return (
            <button
              key={page}
              className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 transition ${
            currentPage < totalPages
              ? "cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
