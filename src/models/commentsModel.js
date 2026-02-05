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
  const result = await pool.query(
    `
    INSERT INTO comments (content, user_id, task_id) 
    SELECT $1, $2, t.id
    FROM tasks t
    WHERE t.id = $3 AND t.user_id = $2 
    RETURNING *`,
    [content, userId, taskId],
  );
  return result.rows[0];
}

async function deleteCommentForTaskModel(userId, taskId, commentId) {
  const result = await pool.query(
    `
    DELETE FROM comments
    WHERE id = $1 
    AND task_id = $2
    AND user_id = $3 
    RETURNING id`,
    [commentId, taskId, userId],
  );

  return result.rows[0];
}

module.exports = {
  getCommentsForTaskModel,
  createCommentForTaskModel,
  deleteCommentForTaskModel,
};
