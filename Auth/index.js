const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//.env
dotenv.config({ path: __dirname + "/.env" });

//cors
app.use(cors());
//cookie parser
app.use(cookieParser());
//request body parser
app.use(express.json({ limit: "50mb" }));
//url parser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Database Connection
const url = process.env.DB_URI;
mongoose
    .connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {
        app.listen(4000, () => {
            console.log("Database Connected...");
            console.log(`Server listening at http://localhost:4000`);
        });
    })
    .catch((error) => {
        console.log(
            "An error occurred while connecting to the database: " +
                error.message
        );
        process.exit(1);
    });

app.use("/auth", routes);
