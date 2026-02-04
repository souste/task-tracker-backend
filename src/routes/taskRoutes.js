const { Router } = require("express");
const router = Router();

const {
  getTasksByUserController,
  getTaskByUserController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksController");

const { requireAuth } = require("../middleware/requireAuth");

router.get("/", requireAuth, getTasksByUserController);
router.get("/:id", requireAuth, getTaskByUserController);
router.post("/", requireAuth, createTaskController);
router.patch("/:id", requireAuth, updateTaskController);
router.delete("/:id", requireAuth, deleteTaskController);

module.exports = router;
