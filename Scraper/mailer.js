const nodemailer=require('nodemailer');
const dotenv = require("dotenv");

dotenv.config({ path: __dirname + "/.env" });

const mailer = async function (message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.email, // generated ethereal user
            pass: process.env.password, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.email, // sender address
        to: process.env.email, // list of receivers
        subject: "Scraping Unsuccesful", // Subject line
        text: "An error occured while scraping jobs: "+message
    });

    console.log("Message sent: %s", info.messageId);
};

module.exports=mailer;