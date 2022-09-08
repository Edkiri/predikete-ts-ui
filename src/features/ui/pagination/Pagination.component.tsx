import React, { useState } from 'react';

import { FaForward } from 'react-icons/fa';

import './Pagination.css';

interface PaginationProps {
  count: number;
  take: number;
  setSkip: (skip: number) => void;
}

export function Pagination({ count, take, setSkip }: PaginationProps) {
  const numberOfPages = Math.ceil(count / take);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageButton = (page: number) => {
    setCurrentPage(page);
    setSkip(page * take);
  };

  const handleNext = () => {
    const page = currentPage + 1;
    setCurrentPage(page);
    setSkip(page * take);
  };

  const handlePrevius = () => {
    const page = currentPage - 1;
    setCurrentPage(page);
    setSkip(page * take);
  };

  return (
    <div className="Pagination">
      {pages.length > 1 && (
        <div className="PaginationContainer">
          {currentPage !== pages[0] && (
            <FaForward className="Previus" onClick={handlePrevius} />
          )}
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className={`ControlButton ${currentPage === page && 'active'}`}
              onClick={() => handlePageButton(page)}
            >
              {page + 1}
            </button>
          ))}
          {currentPage !== pages[pages.length - 1] && (
            <FaForward className="Next" onClick={handleNext} />
          )}
        </div>
      )}
    </div>
  );
}
