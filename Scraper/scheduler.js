const cron = require("node-cron");
const scraper = require("./scraper");

//Cron job to run scraper every 2 minutes
const task = cron.schedule("*/2 * * * *", async () => scraper());

task.start();
