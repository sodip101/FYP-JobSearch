const User = require("./model");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
    "510700443434-kmo2bs0uqe7eh0acivbo02l4djh3s1g6.apps.googleusercontent.com"
);
const fetch = require("node-fetch");

exports.facebookAuth = async function (req, res) {
    const { accessToken, userID } = await req.body;
    const urlGraphAPI = `https://graph.facebook.com/v10.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
    fetch(urlGraphAPI, { metthod: "GET" })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const { email, name, picture } = data;
            const token = data.id;

            User.findOne({ email }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "Something went wrong",
                    });
                } else {
                    if (user) {
                        res.send({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            picture: user.picture,
                            new_user: false,
                        });
                    } else {
                        let newUser = new User({
                            name: name,
                            email: email,
                            token: token,
                            picture: picture.data.url,
                        });
                        newUser.save((err, data) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).json({
                                    error:
                                        "Something went wrong while creating new user",
                                });
                            }
                            res.send({
                                id: data._id,
                                name: data.name,
                                email: data.email,
                                picture: data.picture,
                                new_user: true,
                            });
                        });
                    }
                }
            });
        });
};

exports.googleAuth = async function (req, res) {
    const token = await req.body.token;
    client
        .verifyIdToken({
            idToken: token,
            audience:
                "510700443434-kmo2bs0uqe7eh0acivbo02l4djh3s1g6.apps.googleusercontent.com",
        })
        .then((response) => {
            const { email_verified, name, email, picture } = response.payload;

            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Something went wrong",
                        });
                    } else {
                        if (user) {
                            res.send({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                picture: user.picture,
                                new_user: false,
                            });
                        } else {
                            let newUser = new User({
                                name,
                                email,
                                token,
                                picture,
                            });
                            newUser.save((err, data) => {
                                if (err) {
                                    return res.status(400).json({
                                        error:
                                            "Something went wrong while creating new user",
                                    });
                                }
                                res.send({
                                    id: data._id,
                                    name: data.name,
                                    email: data.email,
                                    picture: data.picture,
                                    new_user: true,
                                });
                            });
                        }
                    }
                });
            }
        });
};

exports.saveJob = function (req, res) {
    const { newJob, user } = req.body;

    User.findOne({ email: user.email }).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            function checkDuplicate(job){
                return job.link!==newJob.link;
            }

            const checkResult=user1.savedJobs.every(checkDuplicate);
            if(checkResult===true){
                user1.savedJobs.push(newJob);
                user1.save();
                res.json({
                    message: "Job saved successfully.",
                });
            }else{
                res.json({
                    message: "Job already saved.",
                });
                
            }
            
        }
    });
};

exports.markJob = function (req, res) {
    const { newJob, user } = req.body;
    newJob["appliedDate"] = new Date().toDateString();

    User.findOne({ email: user.email }).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            function checkDuplicate(job) {
                return job.link !== newJob.link;
            }

            const checkResult = user1.appliedJobs.every(checkDuplicate);
            if (checkResult === true) {
                user1.appliedJobs.push(newJob);
                user1.save();
                res.json({
                    message: "Job marked as applied.",
                });
            } else {
                res.json({
                    message: "Job already marked as applied.",
                });
            }
        }
    });
};

exports.getSavedJobs = function (req, res) {
    const { id } = req.params;

    User.findById( id ).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            res.json(user1.savedJobs);
        }
    });
};

exports.getAppliedJobs = function (req, res) {
    const { id } = req.params;

    User.findById(id).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            res.json(user1.appliedJobs);
        }
    });
};

exports.deleteSavedJob = function (req, res) {
    const { user, job } = req.body;

    User.findById(user).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            let savedJobsUpdated = user1.savedJobs.filter(
                (savedJob) => savedJob.link !== job
            );
            user1.savedJobs = savedJobsUpdated;
            user1.save();

            res.json(user1.savedJobs);
        }
    });
};

exports.deleteAppliedJob = function (req, res) {
    const { user, job } = req.body;

    User.findById(user).exec((err, user1) => {
        if (err) {
            return res.status(500).json({
                error: "Server Error",
            });
        } else {
            let appliedJobsUpdated = user1.appliedJobs.filter(
                (appliedJob) => appliedJob.link !== job
            );
            user1.appliedJobs = appliedJobsUpdated;
            user1.save();

            res.json(user1.appliedJobs);
        }
    });
};
