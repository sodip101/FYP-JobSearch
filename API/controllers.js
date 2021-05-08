const Job = require("./jobModel");

exports.insertIntoDatabase = async function (req, res) {
    const allJobs = await req.body.allJobs;

    if (allJobs) {
        await Job.deleteMany({});
        Job.insertMany(allJobs)
            .then((result) => {
                res.status(200).json({
                    message: "Data successfully added to the database",
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(err.message);
            });
    } else {
        res.status(400).json({
            message: "Invalid Request",
        });
    }
};

exports.searchJobs = function (req, res) {
    const searchQuery = req.query.search_q;
    const location = req.query.location;
    const portal=req.query.portal;
    const category=req.query.category;

    if (searchQuery) {
        searchQuery.trim();
        if(!location && !portal & !category){
            Job.find(
                { title: new RegExp(searchQuery, "i") },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else if(location && !portal && !category){
            location.trim();
            Job.find(
                {
                    $and: [
                        { title: new RegExp(searchQuery, "i") },
                        { location: new RegExp(location, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else if(location && portal && !category){
            location.trim();

            Job.find(
                {
                    $and: [
                        { title: new RegExp(searchQuery, "i") },
                        { portal: new RegExp(portal, "i") },
                        { location: new RegExp(location, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else if(location && portal && category){
            location.trim();

            Job.find(
                {
                    $and: [
                        { title: new RegExp(searchQuery, "i") },
                        { portal: new RegExp(portal, "i") },
                        { location: new RegExp(location, "i") },
                        { category: new RegExp(category,"i")}
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else if (!location && portal && !category){

            Job.find(
                {
                    $and: [
                        { title: new RegExp(searchQuery, "i") },
                        { portal: new RegExp(portal, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else if (!location && portal && category){

            Job.find(
                {
                    $and: [
                        { title: new RegExp(searchQuery, "i") },
                        { portal: new RegExp(portal, "i") },
                        { category: new RegExp(category, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        }else{
            res.status(400).json({ message: "Invalid Search" });
        }
    } else if (!searchQuery) {
        if (!location && !portal & !category) {
            res.status(400).json({message:"Invalid Search"});
        } else if (location && !portal && !category) {
            location.trim();
            Job.find(
                { location: new RegExp(location, "i") },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        } else if (location && portal && !category) {
            location.trim();

            Job.find(
                {
                    $and: [
                        { portal: new RegExp(portal, "i") },
                        { location: new RegExp(location, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        } else if (location && portal && category) {
            location.trim();

            Job.find(
                {
                    $and: [
                        { portal: new RegExp(portal, "i") },
                        { location: new RegExp(location, "i") },
                        { category: new RegExp(category, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        } else if (!location && portal && !category) {

            Job.find(
                {
                    $and: [
                        { portal: new RegExp(portal, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        } else if (!location && portal && category) {

            Job.find(
                {
                    $and: [
                        { portal: new RegExp(portal, "i") },
                        { category: new RegExp(category, "i") },
                    ],
                },
                { __v: 0, category: 0 },
                (error, result) => {
                    if (error) {
                        res.status(500).json({ message: error.message });
                    } else {
                        if (result.length < 1) {
                            res.status(404).json({ message: "Not Found" });
                        } else {
                            res.send(result);
                        }
                    }
                }
            );
        } else {
            res.status(400).json({ message: "Invalid Search" });
        }
    }
}

exports.getAllPortals = function (req, res) {
    Job.find({}, { __v: 0 })
        .distinct("portal")
        .then((result) => res.send(result))
        .catch((error) => res.status(500).json({ message: error.message }));
};

exports.getPortalCategories = function (req, res) {
    const portal = req.params.portal;

    if (portal) {
        Job.find({ portal: portal }, { __v: 0 })
            .distinct("category")
            .then((result) => res.send(result))
            .catch((error) => res.status(500).json({ message: error.message }));
    } else {
        res.status(400).json({ message: "Invalid Request" });
    }
};