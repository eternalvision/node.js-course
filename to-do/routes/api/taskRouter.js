const {
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
} = require("./taskModel");

const taskRouter = async (router) => {
    router.get("/", async (req, res) => {
        try {
            await res.json(getAllTasks());
        } catch (error) {
            console.error(error);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const task = getTaskById(req.params.id);
            if (task) {
                await res.json(task);
            } else {
                await res.status(404).send("Task not found!");
            }
        } catch (error) {
            console.error(error);
        }
    });

    router.post("/", async (req, res) => {
        try {
            const newTask = addTask(req.body);
            await res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const updatedTask = updateTask(req.params.id, req.body);
            if (updateTask) {
                await res.json(updatedTask);
            } else {
                await res.status(404).send("Task not found");
            }
        } catch (error) {
            console.error(error);
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const result = deleteTask(req.params.id);
            if (result) {
                await res.send("Task deleted");
            } else {
                await res.status(404).send("Task not found");
            }
        } catch (error) {
            console.error(error);
        }
    });
};

module.exports = { taskRouter };
