import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskHandler from "./handlers/taskhandler.js";

const app = express();
//connecting the local server
mongoose.connect("mongodb://localhost:27017/tasks");

app.use(cors()); //to have no effect of cors
app.use(express.json());

//taskHandler router in this route
app.use("/api/task", taskHandler);

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
