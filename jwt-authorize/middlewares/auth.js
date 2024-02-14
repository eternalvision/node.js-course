const passport = require("passport");

module.exports = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unathorized!" });
        }
        req.user = user;

        next();
    })(req, res, next);
};
