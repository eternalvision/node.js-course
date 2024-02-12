const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/tasks.json");

const GenerateId = Math.floor(Math.random() * 1000);

const readTasksFromFile = () => {
    try {
        const tasksJson = fs.readFileSync(filePath, "utf8");
        return JSON.parse(tasksJson);
    } catch (error) {
        console.error(error);
        return [];
    }
};

const writeTasksToFile = (tasks) => {
    try {
        const tasksJson = JSON.stringify(tasks, null, 2);
        fs.writeFileSync(filePath, tasksJson, "utf8");
    } catch (error) {
        console.error(error);
    }
};

const findTaskIndex = (id, tasks) => {
    return tasks.findIndex((task) => task.id === parseInt(id));
};

module.exports = {
    getAllTasks: () => readTasksFromFile(),
    getTaskById: (id) => {
        let tasks = readTasksFromFile();
        return tasks.find((task) => task.id === parseInt(id));
    },
    addTask: (task) => {
        let tasks = readTasksFromFile();
        const newTask = { id: GenerateId, ...task };
        tasks.push(newTask);
        writeTasksToFile(tasks);
        return newTask;
    },
    updateTask: (id, updatedTask) => {
        let tasks = readTasksFromFile();
        const index = findTaskIndex(id, tasks);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updatedTask };
            writeTasksToFile(tasks);
            return tasks[index];
        }
        return null;
    },
    deleteTask: (id) => {
        let tasks = readTasksFromFile();
        const index = findTaskIndex(id, tasks);
        if (index !== -1) {
            tasks = tasks.filter((task) => task.id !== parseInt(id));
            writeTasksToFile(tasks);
            return true;
        }
        return null;
    },
};
