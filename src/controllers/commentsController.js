const { createCommentForTaskModel } = require("../models/commentsModel");

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
  createCommentForTaskController,
};
