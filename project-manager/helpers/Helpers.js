const jwt = require("jsonwebtoken");

module.exports = {
    sendDataHelper: (res, code, type, message) => {
        return res.status(code)[type](message);
    },
    authenticatedToken: (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.SECURE_TOKEN, (err, user) => {
            if (err) return res.status(403).send(err);
            req.user = user;
            next();
        });
    },
};
