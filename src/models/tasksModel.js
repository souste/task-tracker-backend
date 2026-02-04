const pool = require("../db/pool");

async function getTasksByUserModel(userId) {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC", [userId]);
  return result.rows;
}

async function getTaskByUserModel(userId, taskId) {
  const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1 AND id = $2", [userId, taskId]);
  return result.rows[0];
}

async function createTaskModel(title, description, userId) {
  const result = await pool.query("INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *", [
    title,
    description,
    userId,
  ]);

  return result.rows[0];
}

async function updateTaskModel(title, description, userId, taskId) {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2 WHERE user_id = $3 AND id = $4 RETURNING *",
    [title, description, userId, taskId],
  );

  return result.rows[0];
}

async function deleteTaskModel(userId, taskId) {
  const result = await pool.query("DELETE FROM tasks WHERE user_id = $1 AND id = $2 RETURNING id", [userId, taskId]);

  return result.rows[0];
}

module.exports = {
  getTasksByUserModel,
  getTaskByUserModel,
  createTaskModel,
  updateTaskModel,
  deleteTaskModel,
};
