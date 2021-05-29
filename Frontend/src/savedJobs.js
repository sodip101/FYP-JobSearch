import React from "react";

export default function SavedJobs({ loading, user, setJobs, jobs }) {
    console.log(user.id);

    function deleteJob(job) {
        fetch("http://localhost:4000/auth/saved-jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user.id, job: job.link }),
        })
            .then((reponse) => reponse.json())
            .then((jobs) => setJobs(jobs))
            .then(() => console.log("deleted job"));
    }

    if (loading === true) {
        return (
            <>
                <div id="userJobs">
                    <table id="savedJobs">
                        <tr>
                            <th>Job Title</th>
                            <th>Scraped Date</th>
                            <th>Saved Date</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>
            </>
        );
    }

    return (
        <>
            <div id="userJobs">
                <table id="savedJobs">
                    <tr>
                        <th>Job Title</th>
                        <th>Scraped Date</th>
                        <th>Saved Date</th>
                        <th>Action</th>
                    </tr>
                    {jobs.map((job) => {
                        return (
                            <tr>
                                <td>
                                    <a
                                        href={job.link}
                                        style={{ fontWeight: "bold" }}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {job["title"]}
                                    </a>
                                </td>
                                <td>{job["scrapedOn"]}</td>
                                <td>{job["savedDate"]}</td>
                                <td>
                                    <button
                                        onClick={() => deleteJob(job)}
                                        className="btnDelete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </>
    );
}
