const pool = require("../db/pool");

// async function getCommentsForTaskModel(userId, taskId) {
//   const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1 AND task_id = $2 RETURNING *", [
//     userId,
//     taskId,
//   ]);

//   return result.rows;
// }

async function createCommentForTaskModel(content, userId, taskId) {
  const result = await pool.query("INSERT INTO COMMENTS (content, user_id, task_id) VALUES ($1, $2, $3) RETURNING *", [
    content,
    userId,
    taskId,
  ]);
  return result.rows[0];
}

// async function deleteCommentForTask(userId, commentId) {
//   const result = await pool.query("DELETE FROM tasks WHERE user_id = $1 AND id = $2 RETURNING id", [userId, commentId]);

//   return result.rows[0];
// }

module.exports = {
  createCommentForTaskModel,
};
