const express = require("express");
let User = require("../models/user");
let Project = require("../models/project");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, userIds } = req.body;
        const newProject = new Project({
            name,
            userIds: userIds || [],
        });
        await newProject.save();
        userIds.forEach(async (userId) => {
            const user = await User.findById(userId);
            if (user) {
                user.projects.push(newProject._id);
                await user.save();
            }
        });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().populate("userIds");
        res.status(200).json(projects);
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

router.put("/:projectId", async (req, res) => {
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
        ).populate("userIds");
        if (!project) return res.status(404).send("Project not found");
        res.status(200).json(project);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByIdAndRemove(projectId);
        if (!project) return res.status(404).send("Project not found");

        project.userIds.forEach(async (userId) => {
            const user = await User.findById(userId);
            if (user) {
                user.projects.pull(project._id);
                await user.save();
            }
        });
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
