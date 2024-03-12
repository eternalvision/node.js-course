let { Project, User } = require("../models");

module.exports = (router, helpers) => {
    const { sendDataHelper } = helpers;

    router.post("/:projectId", async (req, res) => {
        try {
            const { projectId } = req.params;
            const { userId } = req.body;

            const project = await Project.findById(projectId);
            if (!project)
                return sendDataHelper(res, 404, "json", {
                    message: "Project not found",
                });

            if (!project.userIds.includes(userId)) {
                project.userIds.push(userId);
                await project.save();

                const user = await User.findById(userId);
                if (user && !user.projects.includes(project._id)) {
                    user.projects.push(project._id);
                    await user.save();
                }
            }
            sendDataHelper(res, 200, "json", { project });
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.get("/:projectId", async (req, res) => {
        try {
            const { projectId } = req.params;

            const project = await Project.findById(projectId).populate(
                "userIds",
            );
            if (!project)
                return sendDataHelper(res, 404, "json", {
                    message: "Project not found",
                });

            res.status(200).json(project);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.delete("/:projectId/:userId", async (req, res) => {
        try {
            const { projectId, userId } = req.params;

            const project = await Project.findById(projectId);
            if (!project)
                return sendDataHelper(res, 404, "json", {
                    message: "Project not found",
                });

            project.userIds.pull(userId);
            await project.save();

            const user = await User.findById(userId);
            if (user) {
                user.projects.pull(projectId);
                await user.save();
                sendDataHelper(res, 200, "json", {});
            }
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });
};
