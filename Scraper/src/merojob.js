// const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");

//scrape links for all the categories
const getCategories = async function (baseURL) {
    try {
        let categories = [];

        const response = await axios.get(baseURL);
        let page = await response.data;
        let $ = cheerio.load(page);

        let data = $("#JobsByIndustry").find(".list-item");
        data.each((i, item) => {
            const category = {
                categoryLink: baseURL + $(item).find("a").attr("href"),
                categoryName: $(item).find("a").attr("title"),
            };
            categories.push(category);
        });

        if (categories.length < 1) {
            return Error(
                "\r\n" +
                    "An error occurred while scraping categories from Mero Job: unable to scrape categories"
            );
        }

        return categories;
    } catch (error) {
        return Error(
            "\n" +
                "An error occurred while getting categories for Merojob: " +
                error.message
        );
    }
};

//scrape jobs data from all the categories
const getJobs = async function (category, URL) {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(0);
    try {
        let allJobs = [];

        let baseURL = URL;
        let request = await axios.get(category["categoryLink"]);
        // await page.goto(category["categoryLink"]);
        while (true) {
            const page = await request.data;
            // const pageContent = await page.content();
            const $ = cheerio.load(page);
            const data = $("#search_job").children();
            data.each((i, child) => {
                const link = $(child)
                    .find('h1[itemprop="title"]')
                    .find("a")
                    .attr("href");
                if (link) {
                    const jobLink = baseURL + link;
                    const job = {
                        title: $(child)
                            .find('h1[itemprop="title"]')
                            .find("a")
                            .attr("title"),
                        company: $(child).find("h3.h6").attr("title"),
                        link: jobLink,
                        portal: "merojob",
                        category: category["categoryName"].split("/").join("-"),
                        location: $(child)
                            .find('meta[itemprop="addressRegion"]')
                            .attr("content"),
                        deadline: $(child)
                            .find('meta[itemprop="validThrough"]')
                            .attr("content"),
                    };
                    allJobs.push(job);
                }
            });

            next = $("a.pagination-next.page-link").attr("href");
            if (next) {
                // await page.goto(baseURL + next);
                request = await axios.get(baseURL + next);
            } else {
                break;
            }
        }

        // await browser.close();

        return allJobs;
    } catch (error) {
        // await browser.close();
        return Error(
            "\n" +
                "An error occurred while scraping jobs from Merojob: " +
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
            let jobs = await getJobs(category, baseURL);
            //removing duplicate job links
            jobs.forEach((job) => {
                if (!allLinks.has(job["link"])) {
                    allLinks.add(job["link"]);
                    allJobs.push(job);
                }
            });
        }
        console.log("Finished scraping Merojob");
        return allJobs;
    } catch (error) {
        return error;
    }
};

//export for the main scraper
module.exports = main;
