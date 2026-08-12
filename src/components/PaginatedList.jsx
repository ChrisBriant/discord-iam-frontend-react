import React from 'react';

export function PaginatedList({
  paginatedData,
  itemComponent: ItemComponent,
  onPageChange,
  isLoading = false,
  className = '',
  gridClassName = 'itemSelector',
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
    <div className={`${className}`}>
      {/* Header Info */}
      <div className="head">
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
      <div className="controls">
        <button
          onClick={handlePrev}
          disabled={page <= 1 || isLoading}
          className="calendar-btn-nav"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          {page} of {total_pages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= total_pages || isLoading}
          className="calendar-btn-nav"
        >
          Next
        </button>
      </div>
    </div>
  );
}