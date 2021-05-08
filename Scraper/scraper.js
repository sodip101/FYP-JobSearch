const jobsnepal = require("./src/jobsnepal");
const kumarijob = require("./src/kumarijob");
const merojob = require("./src/merojob");

const fetch = require("node-fetch");
const mailer = require("./mailer");

//Main scraper function
const Scraper = async function () {
    try {
        //Scraping data from all the portals
        console.log("\nScraping started at: " + new Date());
        
        let allJobs = [];
        let scrapeResults = await Promise.all([
            kumarijob("https://www.kumarijob.com/"),
            merojob("https://merojob.com"),
            jobsnepal("https://www.jobsnepal.com/"),
        ]);

        scrapeResults.forEach((value) => {
            allJobs.push(...value);
        });

        //Updating database with the scraped data
        fetch("http://localhost:5000/fyp/api/database", {
            method: "post",
            body: JSON.stringify({ allJobs }),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((result) => console.log(result.message))
            .then(() => console.log("Scraping finished at: " + new Date()))
            .then(() => console.log("Total Jobs Scraped: " + allJobs.length));
    } catch (error) {
        console.log("Scraping Unsuccessful: " + error.message);
        mailer(error.message)
            .then(() => {
                console.log("The admin has been notified about the error.");
                process.exit(1);
            })
            .catch((err) =>
                console.log(
                    "An error occured while notifying the admin: " + err.message
                )
            );
    }
};

//export to run from scheduler
module.exports = Scraper;
