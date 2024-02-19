const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "PJOJ023858PSFUihijshf9234IIklklklk";

app.use(express.json());

const verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "No token!" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err)
            return res
                .status(500)
                .send({ message: "Token authenticated error!" });
        req.userId = decoded.id;
        next();
    });
};

app.post("/login", (req, res) => {
    const { userId } = req.body;
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn: 86400 });

    res.status(200).send({ auth: true, token: token });
});

app.get("/profile", verifyToken, (req, res) => {
    res.status(200).send("Hi, this is your profile, you authenticated success");
});

app.listen(3101);
