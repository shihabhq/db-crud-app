import express from "express";
import mongoose from "mongoose";
import Task from "../schemas/taskSchema.js";

//task handling router
const taskHandler = express.Router();

//post handler for posting data
taskHandler.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(200).send({ msg: "task added successfully" });
});

//get all the task throug handler
taskHandler.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
});

//clearing all the task handler
taskHandler.delete("/", async (req, res) => {
  try {
    await Task.collection.drop();
    res.status(200).send({ msg: "db deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default taskHandler;
