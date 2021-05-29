const axios = require("axios");
const cheerio = require("cheerio");

//scrape links for all the categories
const getCategories = async function (baseURL) {
    try {
        let categories = [];

        const response = await axios.get(baseURL);
        const page = await response.data;
        const $ = cheerio.load(page);

        const data = $("ul.fav-list").children();
        data.each((i, item) => {
            const category = {
                categoryLink: $(item).find("a").attr("href"),
                categoryName:
                    $(item).find(".cat-text").text().trim() || "Others",
            };
            categories.push(category);
        });

        if (categories.length < 1) {
            return Error(
                "\r\n" +
                    "An error occurred while scraping categories from Kumarijob: unable to scrape categories"
            );
        }

        return categories;
    } catch (error) {
        return Error(
            "\r\n" +
                "An error occurred while scraping categories from Kumarijob: " +
                error.message
        );
    }
};

//scrape jobs data from all the categories
const getJobs = async function (category) {
    try {
        let allJobs = [];
        const reponse = await axios.get(category["categoryLink"]);
        const page = await reponse.data;
        const $ = cheerio.load(page);

        const data = $("div.job-listing").children();
        data.each((i, item) => {
            const job = {
                title: $(item).find("h5").find("a").text(),
                company: $(item).find("span.title").find("a").text().trim(),
                link: $(item).find("h5").find("a").attr("href"),
                portal: "kumarijob",
                category: category["categoryName"],
                location: $(item)
                    .find("ul.job-exp-list")
                    .children()
                    .first()
                    .children()
                    .last()
                    .text()
                    .replace(":", "")
                    .trim()
                    .replace(",...", ""),
                deadline: $(item).find("div.left-content").text().trim(),
            };
            allJobs.push(job);
        });

        if (allJobs.length < 1) {
            return Error(
                "\r\n" +
                    "An error occurred while scraping jobs from Kumarijob: unable to scrape jobs"
            );
        }

        return allJobs;
    } catch (error) {
        return Error(
            "\r\n" +
                "An error occurred while scraping jobs from Kumarijob: " +
                error.message
        );
    }
};

//main function
const main = async function (baseURL) {
    try {
        const allJobs = [];
        const allLinks = new Set();

        const categories = await getCategories(baseURL);
        for (category of categories) {
            let jobs = await getJobs(category);
            //removing duplicate job links
            jobs.forEach((job) => {
                if (!allLinks.has(job["link"])) {
                    allLinks.add(job["link"]);
                    allJobs.push(job);
                }
            });
        }
        console.log("Finished scraping Kumarijob");
        return allJobs;
    } catch (error) {
        return error;
    }
};

//export for the main scraper
module.exports = main;
