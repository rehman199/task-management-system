const Task = require("../models/tasksModel");
const jwt = require("jsonwebtoken");
const { decodedUser } = require("../utils/jwtHelper");

const addNewTask = async (req, res, next) => {
  try {
    const userId = decodedUser(req.get("Authorization").split(" ")[1]).id;

    const task = new Task({
      ...req.body.task,
      userId,
    });
    await task.save();

    return res.send({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const getTask = (req, res, next) => {
  res.send({ task: {} });
};

const fetchTasks = async (req, res, next) => {
  try {
    const userId = decodedUser(req.get("Authorization").split(" ")[1]).id;

    const statusFilter = req.query?.status;
    const tasks = await Task.find({
      userId,
      ...(statusFilter && { status: statusFilter }),
    }).exec();

    res.send({ tasks: tasks });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskToUpdate = req.body.task;
    await Task.findOneAndUpdate({ _id: req.params.id }, taskToUpdate, {
      runValidators: true,
    }).exec();

    res.send({
      success: true,
      message: "Task updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findOneAndDelete(
      { _id: req.params.id },
      { runValidators: true }
    ).exec();

    res.send({
      message: "Task deleted successfully",
      success: true,
      deleted,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addNewTask, fetchTasks, getTask, deleteTask, updateTask };
