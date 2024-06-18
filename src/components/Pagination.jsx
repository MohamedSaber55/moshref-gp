import propTypes from "prop-types"

const Pagination = ({ currentPage, totalPageCount, onPageChange, onNextPage, onPrevPage }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const windowSize = 5;

        let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
        let endPage = Math.min(totalPageCount, startPage + windowSize - 1);

        if (totalPageCount <= 10) {
            for (let i = 1; i <= totalPageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (endPage - startPage < windowSize - 1) {
                startPage = Math.max(1, endPage - windowSize + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
        }

        return (
            <ul className="flex">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`mx-1 py-1 px-3 font-bold ${currentPage === pageNumber
                                ? 'bg-main text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                } rounded`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="pagination flex items-center justify-center">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="bg-gray-200 disabled:bg-gray-300 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-s"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            {renderPageNumbers()}
            <button
                onClick={onNextPage}
                disabled={currentPage === totalPageCount}
                className="bg-gray-200 disabled:bg-gray-300 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-e"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: propTypes.number,
    totalPageCount: propTypes.number,
    onPageChange: propTypes.func,
    onNextPage: propTypes.func,
    onPrevPage: propTypes.func,
}

export default Pagination;
