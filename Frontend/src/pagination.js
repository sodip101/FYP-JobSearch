import React from 'react';

const Pagination=({resultsPerPage,currentPage,totalResults,paginate})=>{

    const pageNumbers = [];
    let nextPage = currentPage + 1;
    let previousPage = currentPage - 1;

    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length > 1) {
        return (
            <>
                <footer>
                    <div className="pagination">
                        <div>
                            <button
                                onClick={() => paginate(previousPage)}
                                hidden={currentPage === 1 ? true : false}
                                className={
                                    (currentPage === previousPage
                                        ? "active-page"
                                        : "") + " page-link"
                                }
                            >
                                <b>l&lt;</b>
                            </button>
                            {pageNumbers.map((number) => (
                                <button
                                    onClick={() => paginate(number)}
                                    className={
                                        (currentPage === number
                                            ? "active-page"
                                            : "") + " page-link"
                                    }
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                href=""
                                onClick={() => paginate(nextPage)}
                                hidden={
                                    currentPage ===
                                    pageNumbers[pageNumbers.length - 1]
                                        ? true
                                        : false
                                }
                                className={
                                    (currentPage === nextPage
                                        ? "active-page"
                                        : "") + " page-link"
                                }
                            >
                                <b>&gt;l</b>
                            </button>
                        </div>
                    </div>
                </footer>
            </>
        );
    } else {
        return <></>;
    }
}

export default Pagination;