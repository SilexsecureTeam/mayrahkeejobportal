import React from 'react';
// import classnames from 'classnames';
// import './pagination.scss';
// import '../../assets/css/pagination.scss';
import { usePagination, DOTS } from '../utils/usePagination';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
const CustomPagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div
      className="flex pb-6"
    >
      <button
        disabled={currentPage === 1}
        className="hover:bg-gray-200 px-3 py-1"
        onClick={onPrevious}
      >
        <MdChevronLeft size={20} />
      </button>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <button key={pageNumber} className="hover:bg-gray-200 px-3 py-1">&#8230;</button>;
        }

        return (
          <button
            // style={{ fontWeight: currentPage === pageNumber ? "600" : "normal" }}
            key={pageNumber}
            className={` px-3 py-1 ${currentPage === pageNumber ? "bg-green-600 text-white rounded" : "hover:bg-gray-200"}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        disabled={currentPage === lastPage}
        className="hover:bg-gray-200 px-3 py-1"
        onClick={onNext}
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
};

export default CustomPagination;