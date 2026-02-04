const { Router } = require("express");
const router = Router();

const {
  getTasksByUserController,
  //   getTaskByUserController,
  createTaskController,
  //   updateTaskController,
  //   deleteTaskController,
} = require("../controllers/tasksController");

const { requireAuth } = require("../middleware/requireAuth");

router.get("/", requireAuth, getTasksByUserController);
router.post("/", requireAuth, createTaskController);

module.exports = router;
