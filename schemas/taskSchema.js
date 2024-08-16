import mongoose from "mongoose";

//constructing the schema to protect the nosql db
const taskSchma = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const Task = mongoose.model("Task", taskSchma);

export default Task;
