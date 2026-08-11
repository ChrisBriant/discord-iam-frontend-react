import React from 'react';

export function PaginatedList({
  paginatedData,
  itemComponent: ItemComponent,
  onPageChange,
  isLoading = false,
  className = '',
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
}) {
  const { data, page, total_pages, total, prev_page, next_page } = paginatedData;
  
  console.log("PAGINATED DATA",   paginatedData, onPageChange );

  const handlePrev = () => {
    if (page > 1 && onPageChange) {
      onPageChange(page - 1, prev_page);
    }
  };

  const handleNext = () => {
    if (page < total_pages && onPageChange) {
      onPageChange(page + 1, next_page);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Header Info */}
      <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-2">
        <span>
          Showing page <strong>{page}</strong> of <strong>{total_pages}</strong>
        </span>
        <span>
          Total items: <strong>{total}</strong>
        </span>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading data...</div>
      ) : data.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No records found.</div>
      ) : (
        <div className={gridClassName}>
          {data.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t pt-4">
        <button
          onClick={handlePrev}
          disabled={page <= 1 || isLoading}
          className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          Page {page} of {total_pages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= total_pages || isLoading}
          className="px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}