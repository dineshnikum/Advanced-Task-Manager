import Task from "../models/taskModel.js";

// create task
export const createTask = async (req, res) => {
  const { title, description, priority, category, dueDate, status } = req.body;
  const userId = req.user.userId;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Task title is required!" });
  }

  try {
    const newTask = await Task.create({
      title,
      description: description || "No description",
      priority: priority || "medium",
      category: category || "other",
      status: status || "todo",
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully!",
      data: newTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error occured during task creation!",
      error: err.message,
    });
  }
};

// get tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    if (tasks.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No tasks found!", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully!",
      data: tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error occured during task fetching!",
      error: err.message,
    });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      data: updatedTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error occured during task updating!",
      error: err.message,
    });
  }
};

// delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    res.status(200).json({
      success: true,
      message: "Task deleted successfully!",
      data: deletedTask,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error occured during task deletion!",
      error: err.message,
    });
  }
};

export const getDueSoonTasks = async (req, res) => {
  try {
    const dueSoonTasks = await Task.find({
      user: req.user.userId,
      dueDate: { $gt: new Date() },
    }).sort({ dueDate: 1 });
    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully!",
      data: dueSoonTasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error occured during task fetching!",
      error: err.message,
    });
  }
};
