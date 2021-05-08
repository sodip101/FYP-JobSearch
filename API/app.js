const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRoutes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");

//.env
dotenv.config({ path: __dirname + "/.env" });

//cors
app.use(cors());

//request body parser
app.use(express.json({ limit: "50mb" }));
//url parser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Database Connection
const url = process.env.DB_URI;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
.then((result) => {
    app.listen(5000, () => {
        console.log("Database Connected...");
        console.log(`Server listening at http://localhost:5000`);
    });
})
.catch((error) => {
    console.log("An error occurred while connecting to the database: " + error.message);
    process.exit(1);
});

app.use("/fyp/api", apiRoutes);
