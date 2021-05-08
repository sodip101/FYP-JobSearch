import React from "react";
import companyIcon from "./assets/company.svg";
import locationIcon from "./assets/location.svg";
import deadlineIcon from "./assets/deadline.svg";
import SaveJob from './saveJob';

function Job({ job,user }) {
    return (
        <div className="result">
            <div className="container">
                <h3 style={{ paddingBottom: "5px" }}>
                    <a href={job.link} target="_blank" rel="noreferrer">
                        {job.title}
                    </a>
                </h3>
                <div className="container-div">
                    <img src={companyIcon} height="20px" alt="job icon" />
                    <h4>{job.company}</h4>
                </div>
                <div className="container-div">
                    <img src={locationIcon} height="20px" alt="location icon" />
                    <p>{job.location}</p>
                </div>
                <div className="container-div">
                    <img src={deadlineIcon} height="20px" alt="location icon" />
                    <p>{job.deadline}</p>
                </div>
                <div className="container-div">
                    <p>SOURCE: {job.portal.toUpperCase()}</p>
                </div>
                <div className="container-div">
                    <p>Scraped On: {job.scrapedOn}</p>
                </div>
                <SaveJob job={job} user={user} />
            </div>
        </div>
    );
}

export default Job;
