const { getCommentsForTaskModel, createCommentForTaskModel } = require("../models/commentsModel");
const { getTaskByUserModel } = require("../models/tasksModel");

const getCommentsForTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;

    // don't need to check tasks because of the model enforces ownership with a JOIN

    const comments = await getCommentsForTaskModel(userId, taskId);

    return res.status(200).json({
      success: true,
      data: comments,
      message: `Comments for task ${taskId} retrieved successsfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createCommentForTaskController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Comments cannot be empty",
      });
    }
    const created = await createCommentForTaskModel(content, userId, taskId);

    return res.status(201).json({
      success: true,
      data: created,
      message: `Comment for task ${taskId} created successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getCommentsForTaskController,
  createCommentForTaskController,
};
