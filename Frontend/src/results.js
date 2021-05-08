import React from "react";
import Job from "./job";
import jobSearchSVG from "./assets/job_search.svg";
import invalidSearchSVG from "./assets/invalid_search.svg";
import internalErrorSVG from "./assets/internal_error.svg";
import notMatchesSVG from "./assets/not_found.svg";
import Pagination from "./pagination";

function Results({ results,user,location,selectedPortal,selectedCategory,currentPage,setCurrentPage}) {
    
    //Filter Tags
    let filterTags;
    if(location || selectedPortal || selectedCategory){
        filterTags = (
            <div id="filterTags">
                <span>Filters:</span>
                <span class="filter" hidden={!location?true:false}>{location}</span>
                <span class="filter" hidden={!selectedPortal?true:false}>
                    {selectedPortal}
                </span>
                <span class="filter" hidden={!selectedCategory?true:false}>
                    {selectedCategory}
                </span>
            </div>
        );
    }
    
    //Search Results
    if(results === ""){
        return (
            <section className="searchResults">
                <div className="noResults">
                    <img src={jobSearchSVG} className="svg" height="500px" alt="job search" />
                    <h1>More Opportunities, Less Effort</h1>
                </div>
            </section>
        );
    }else if (results === 404) {
        return (
            <section className="searchResults">
                <div className="noResults">
                    <h1>No Matches Found</h1>
                    <img src={notMatchesSVG} className="svg" height="500px" alt="no matches found" />
                </div>
            </section>
        );
    } else if(results === 400){
        return (
            <section className="searchResults">
                <div className="noResults">
                    <h1>Invalid Search</h1>
                    <img src={invalidSearchSVG} className="svg" height="500px" alt="job search" />
                </div>
            </section>
        );
    } else if (results === 500){
        return (
            <section className="searchResults">
                <div className="noResults">
                    <h1>Internal Error. Please Try Again.</h1>
                    <img src={internalErrorSVG} className="svg" height="500px" alt="job search" />
                </div>
            </section>
        );
    } else {
        //Pagination vairables
        const resultsPerPage=4;
        const indexOfLastResult = currentPage * resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - resultsPerPage;
        const currentResults = results.slice(
            indexOfFirstResult,
            indexOfLastResult
            );
            //Change Page
            const paginate = (pageNumber) => setCurrentPage(pageNumber);
            
            return (
                <>
                <section className="searchResults">
                    {filterTags}
                    {currentResults.map((job, index) => {
                        return <Job job={job} user={user} />;
                    })}
                </section>
                <Pagination
                    resultsPerPage={resultsPerPage}
                    totalResults={results.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </>
        );
    }
}

export default Results;
