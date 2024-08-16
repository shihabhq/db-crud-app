/**
 * date:16 august 2024,
 * created by: Shihab,
 * description:the frontend javascript part of the app.
 */

//necessary variables
const taskForm = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");
const title = document.querySelector(".title");
const description = document.querySelector("#textarea");
const taskListDiv = document.querySelector(".task-list");
const clearBtn = document.querySelector(".clear-button");

//posting a task into the database
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!title.value.trim() || !description.value.trim()) {
    console.error("Title or description is empty!");
    return;
  }
  const newTask = {
    title: title.value.trim(),
    description: description.value.trim(),
  };
  try {
    const response = await fetch("http://localhost:8000/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result.msg);
    fetchTask();
    taskForm.reset();
  } catch (error) {
    console.log(error);
  }
});

//function for getting all the tasks
async function fetchTask() {
  try {
    const data = await fetch("http://localhost:8000/api/task");
    const tasks = await data.json();
    if (tasks) {
      taskListDiv.innerHTML = "";
      tasks.forEach((task) => {
        const taskEl = document.createElement("div");
        taskEl.innerHTML = `<h3>${task.title}</h3> <p>${
          task.description ? task.description : ""
        }</p>`;
        taskListDiv.appendChild(taskEl);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
//on dom content loaded user can see the previous assigned tasks
window.addEventListener("DOMContentLoaded", fetchTask);

//clear all the tasks from db
clearBtn.addEventListener("click", async () => {
  try {
    const deleteDB = await fetch("http://localhost:8000/api/task", {
      method: "DELETE",
    });
    const response = await deleteDB.json();
    console.log(response.msg);
    fetchTask();
  } catch (error) {
    console.log(error);
  }
});
