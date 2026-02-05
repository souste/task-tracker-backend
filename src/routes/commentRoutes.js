const { Router } = require("express");
const router = Router({ mergeParams: true });

const {
  getCommentsForTaskController,
  createCommentForTaskController,
  deleteCommentForTaskController,
} = require("../controllers/commentsController");
const { requireAuth } = require("../middleware/requireAuth");

router.get("/", requireAuth, getCommentsForTaskController);
router.post("/", requireAuth, createCommentForTaskController);
router.delete("/:commentId", requireAuth, deleteCommentForTaskController);

module.exports = router;
