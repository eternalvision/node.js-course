require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Employee = require("./models/Employee");

const { PORT } = process.env;

connectDB();

const app = express();
const port = PORT || 3000;

app.use(express.json());

app.post("/employees/add", async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/employees/get", async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/employees/get/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employees = await Employee.findById(id);
        res.send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.patch("/employees/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!employee) {
            return res.status(404).send();
        } else {
            res.send(employee);
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete("/employees/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).send();
        } else {
            res.send();
        }
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Server started at PORT ${PORT}`);
});
