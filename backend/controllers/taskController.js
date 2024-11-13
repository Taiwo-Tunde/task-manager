// controllers/taskController.js
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ user: req.user.id, title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id, user: req.user.id });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
