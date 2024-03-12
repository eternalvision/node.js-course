let { User, Project, projectValidation } = require("../models");

const { projectCreateValidation, projectUpdateValidation } = projectValidation;

module.exports = (router, helpers) => {
    const { sendDataHelper, errorResult } = helpers;

    router.post("/", async (req, res) => {
        const validationResult = await errorResult(
            projectCreateValidation,
            req,
            res,
            sendDataHelper,
        );
        if (validationResult) return;

        try {
            const { name, userIds } = req.body;
            const newProject = new Project({
                name,
                userIds: userIds || [],
            });
            if (userIds) {
                await newProject.save();
                userIds.forEach(async (userId) => {
                    const user = await User.findById(userId);
                    if (user) {
                        user.projects.push(newProject._id);
                        await user.save();
                    }
                });
            }
            sendDataHelper(res, 201, "json", newProject);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.get("/", async (req, res) => {
        try {
            const projects = await Project.find().populate(
                "userIds",
                "-password -projects",
            );
            if (!projects)
                return sendDataHelper(res, 404, "json", {
                    messgage: "Project not found",
                });
            sendDataHelper(res, 200, "json", projects);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.get("/:projectId", async (req, res) => {
        try {
            const { projectId } = req.params;
            const project = await Project.findById(projectId).populate(
                "userIds",
                "-password -projects",
            );
            if (!project)
                return sendDataHelper(res, 404, "json", {
                    messgage: "Project not found",
                });
            sendDataHelper(res, 200, "json", project);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.put("/:projectId", async (req, res) => {
        const validationResult = await errorResult(
            projectUpdateValidation,
            req,
            res,
            sendDataHelper,
        );
        if (validationResult) return;

        try {
            const { projectId } = req.params;
            const { name, userIds } = req.body;
            const project = await Project.findByIdAndUpdate(
                projectId,
                {
                    name,
                    userIds,
                },
                { new: true },
            ).populate("userIds", "-password -projects");

            if (!project)
                return sendDataHelper(res, 404, "json", {
                    messgage: "Project not found",
                });
            sendDataHelper(res, 200, "json", project);
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });

    router.delete("/:projectId", async (req, res) => {
        try {
            const { projectId } = req.params;
            const project = await Project.findByIdAndRemove(projectId);
            if (!project)
                return sendDataHelper(res, 404, "json", {
                    messgage: "Project not found",
                });

            project.userIds.forEach(async (userId) => {
                const user = await User.findById(userId);
                if (user) {
                    user.projects.pull(project._id);
                    await user.save();
                }
            });
            sendDataHelper(res, 200, "json", {});
        } catch (error) {
            sendDataHelper(res, 500, "json", error.message);
        }
    });
};
