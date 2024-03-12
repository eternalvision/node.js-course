const express = require("express");
let { Project, User } = require("../models");

const router = express.Router();

router.post("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.body;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send("Project not found");

        if (!project.userIds.includes(userId)) {
            project.userIds.push(userId);
            await project.save();

            const user = await User.findById(userId);
            if (user && !user.projects.includes(project._id)) {
                user.projects.push(project._id);
                await user.save();
            }
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId).populate("userIds");
        if (!project) return res.status(404).send("Project not found");

        res.status(200).json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:projectId/:userId", async (req, res) => {
    try {
        const { projectId, userId } = req.params;

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send("Project not found");

        project.userIds.pull(userId);
        await project.save();

        const user = await User.findById(userId);
        if (user) {
            user.projects.pull(projectId);
            await user.save();
            res.status(200).send();
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
