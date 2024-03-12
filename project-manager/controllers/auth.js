const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user");

const hashedPassword = async (password) => await bcrypt.hash(password, 10);
const checkedPassword = async (password1, password2) =>
    await bcrypt.compare(password1, password2);

module.exports = (router, helpers) => {
    const { sendDataHelper, authenticatedToken } = helpers;

    router.post("/register", async (req, res) => {
        try {
            const { name, username, password } = req.body;

            const newUser = new User({
                name,
                username,
                password: await hashedPassword(password),
                projects: [],
            });
            await newUser.save();

            sendDataHelper(res, 201, "json", {
                message: "User created",
            });
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.post("/login", async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user || !(await checkedPassword(password, user.password))) {
                return sendDataHelper(res, 401, "json", {
                    message: "Invalid credintials",
                });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.SECURE_TOKEN,
                {
                    expiresIn: "1h",
                },
            );

            sendDataHelper(res, 200, "json", { token });
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.get("/profile", authenticatedToken, async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).select(
                "-password",
            );

            if (!user) {
                sendDataHelper(res, 404, "json", { message: "User not found" });
            }

            sendDataHelper(res, 200, "json", { user });
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.put("/profile/update", authenticatedToken, async (req, res) => {
        try {
            const updateData = await User.findByIdAndUpdate(req.user.userId, {
                ...req.body,
            });

            let profile;

            if (updateData) {
                profile = await User.findById(req.user.userId).select(
                    "-password",
                );
            }

            sendDataHelper(res, 200, "json", profile);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.post(
        "/profile/update/password",
        authenticatedToken,
        async (req, res) => {
            try {
                const { oldPassword, newPassword } = req.body;

                const { userId } = req.user;
                const user = await User.findById(userId);

                if (!user) {
                    return sendDataHelper(res, 404, "json", {
                        message: "User not found",
                    });
                }

                const isMatch = await checkedPassword(
                    oldPassword,
                    user.password,
                );
                if (!isMatch) {
                    return sendDataHelper(res, 400, "json", {
                        message: "Old password is incorrect",
                    });
                }

                user.password = await hashedPassword(newPassword);
                await user.save();

                sendDataHelper(res, 200, "json", {
                    message: "Password successfully changed",
                });
            } catch (error) {
                sendDataHelper(res, 500, "json", error.message);
            }
        },
    );

    router.delete("/profile/delete", authenticatedToken, async (req, res) => {
        try {
            const userId = req.user.userId;
            const user = await User.findById(userId);

            if (!user) {
                return sendDataHelper(res, 404, "json", {
                    message: "User not found",
                });
            }

            await User.deleteOne({ _id: userId });

            sendDataHelper(res, 200, "json", {
                message: "Account successfully deleted",
            });
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });
};
