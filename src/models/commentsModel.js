const pool = require("../db/pool");

async function getCommentsForTaskModel(userId, taskId) {
  const result = await pool.query(
    `
    SELECT c.*
    FROM comments c
    JOIN tasks t ON c.task_id = t.id
    WHERE t.user_id = $1 AND t.id = $2
    ORDER BY c.created_at ASC
    `,
    [userId, taskId],
  );

  return result.rows;
}

async function createCommentForTaskModel(content, userId, taskId) {
  const result = await pool.query("INSERT INTO comments (content, user_id, task_id) VALUES ($1, $2, $3) RETURNING *", [
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
  getCommentsForTaskModel,
  createCommentForTaskModel,
};
