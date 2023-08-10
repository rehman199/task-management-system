const {
  addNewTask,
  getTask,
  updateTask,
  deleteTask,
  fetchTasks,
} = require("../controllers/tasksController");
const router = require("express").Router();

router.route("/").post(addNewTask).get(fetchTasks);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
