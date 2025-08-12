import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border-2 border-secondary-200 bg-white text-secondary-700 rounded-lg transition-all duration-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-50 disabled:!cursor-not-allowed disabled:hover:border-secondary-200 disabled:hover:text-secondary-700"
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-4 py-2 border-2 rounded-lg transition-all duration-200 ${
            page === currentPage
              ? 'bg-primary-600 bg-blue-300 border-primary-600'
              : page === '...'
              ? 'border-transparent bg-transparent text-secondary-500'
              : 'border-secondary-200 bg-white text-secondary-700 hover:border-primary-500 hover:text-primary-500'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border-2 border-secondary-200 bg-white text-secondary-700 rounded-lg transition-all duration-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-50 disabled:!cursor-not-allowed disabled:hover:border-secondary-200 disabled:hover:text-secondary-700"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
