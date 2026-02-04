const {
  getTasksByUserModel,
  getTaskByUserModel,
  createTaskModel,
  updateTaskModel,
  deleteTaskModel,
} = require("../models/tasksModel");

const getTasksByUserController = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await getTasksByUserModel(userId);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getTaskByUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const task = await getTaskByUserModel(userId, taskId);

    if (!task) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const createTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Tasks must contain a title and description",
      });
    }

    const created = await createTaskModel(title, description, userId);

    res.status(201).json({
      success: true,
      data: created,
      message: "Task created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Task must contain a title and description",
      });
    }

    const updated = await updateTaskModel(title, description, userId, taskId);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const deleted = await deleteTaskModel(userId, taskId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Task number ${taskId} deleted successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getTasksByUserController,
  getTaskByUserController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
