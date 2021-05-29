const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");

//scrape links for all the categories
const getCategories = async function (baseURL) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    try {
        let categories = [];

        await page.goto(baseURL + "category", { waitUntil: "networkidle0" });
        const pageContent = await page.content();

        let $ = cheerio.load(pageContent);

        let data = $(".container-fluid.pt-2").find(".w-full.px-1");
        data.each((i, item) => {
            const category = {
                categoryLink: baseURL + $(item).find("a").attr("href"),
                categoryName: $(item).find("a").text().trim(),
            };
            categories.push(category);
        });

        await browser.close();

        if (categories.length < 1) {
            return Error(
                "\r\n" +
                    "An error occurred while scraping categories from Jobs Nepal: unable to scrape categories"
            );
        }

        return categories;
    } catch (error) {
        return Error(
            "\n" +
                "An error occurred while scraping categories from Jobs Nepal: " +
                error.message
        );
    }
};

//scrape jobs data from all the categories
const getJobs = async function (category) {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // page.setDefaultNavigationTimeout(0);
    try {
        let allJobs = [];

        // await page.goto(category["categoryLink"]);
        let request = await axios.get(category["categoryLink"]);
        while (true) {
            // const pageContent = await page.content();
            const page = request.data;
            const $ = cheerio.load(page);
            const data = $(
                "#app > div > div > div:nth-child(1) > div.col-md-8.top-content.px-0"
            ).children();
            data.each((i, item) => {
                const data = $(item).find("h2.job-title").attr("title");
                const jobLink = $(item)
                    .find("h2.job-title")
                    .find("a")
                    .attr("href");
                if (jobLink) {
                    const job = {
                        title: data.trim(),
                        company: $(item).find("p.mb-0").text().trim(),
                        link: jobLink,
                        portal: "jobsnepal",
                        category: category["categoryName"].split("/").join("-"),
                        location: $(item)
                            .find("i.icon-location4")
                            .next()
                            .text()
                            .trim(),
                        deadline: "",
                    };
                    allJobs.push(job);
                }
            });

            nextPage = $("ul.pagination")
                .children()
                .last()
                .find("a")
                .attr("href");
            if (nextPage) {
                // await page.goto(nextPage);
                request = await axios.get(nextPage);
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
                "An error occurred while scraping jobs from Jobs Nepal: " +
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
        console.log("Finished scraping Jobs Nepal");
        return allJobs;
    } catch (error) {
        return error;
    }
};

//export for the main function
module.exports = main;
