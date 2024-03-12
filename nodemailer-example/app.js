require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const app = express();

app.use(express.json());

const { PORT, USER, PASSWORD } = process.env;

const readHTMLFile = async (path) => {
    return fs.readFile(path, { encoding: "utf-8" });
};

const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: USER,
        pass: PASSWORD,
    },
};

app.post("/", async (req, res) => {
    const { email, name, text } = req.body;
    const transporter = nodemailer.createTransport(config);

    try {
        const html = await readHTMLFile(__dirname + "/emailTemplate.hbs");
        const template = handlebars.compile(html);
        const htmlToSend = template({ name, text });

        const emailOptions = {
            from: "al.priadchenko@meta.ua",
            to: email,
            subject: "Nodemailer test",
            html: htmlToSend,
            attachments: [
                {
                    filename: "cat.jpg",
                    path: __dirname + "/cat.jpg",
                },
            ],
        };

        await transporter.sendMail(emailOptions);
        res.status(200).json({ message: "Email send successfuly" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

app.listen(PORT);
