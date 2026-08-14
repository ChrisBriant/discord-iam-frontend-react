import React, { useState, useEffect } from 'react';

export default function ClientPaginatedList({
  items = [],
  pageSize = 5,
  itemComponent: ItemComponent,
  onPageChange = null,
  isLoading = false,
  className = '',
  gridClassName = 'itemSelector',
  action = null,
  actionButtonName = 'Ok'
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination metadata
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // Ensure current page stays within valid bounds if the items array changes size
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Extract current page slice
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = items.slice(startIndex, startIndex + pageSize);

  const handlePrev = () => {
    if (currentPage > 1) {
      const nextPage = currentPage - 1;
      setCurrentPage(nextPage);
      if (onPageChange) onPageChange(nextPage);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      if (onPageChange) onPageChange(nextPage);
    }
  };

  return (
    <div className={className}>
      {/* Header Info */}
      <div className="head">
        <span>
          Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <span>
          Total items: <strong>{total}</strong>
        </span>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-12 text-center text-gray-500">Loading data...</div>
      ) : currentData.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No records found.</div>
      ) : (
        <div className={gridClassName}>
          {currentData.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="controls">
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1 || isLoading}
          className="calendar-btn-nav"
        >
          Previous
        </button>

        <span className="text-sm font-medium">
          {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages || isLoading}
          className="calendar-btn-nav"
        >
          Next
        </button>
      </div>

      {/* Action Button */}
      {action && (
        <button onClick={action} className="calendar-btn-nav">
          {actionButtonName}
        </button>
      )}
    </div>
  );
}