const { Router } = require("express");
const router = Router({ mergeParams: true });

const { getCommentsForTaskController, createCommentForTaskController } = require("../controllers/commentsController");
const { requireAuth } = require("../middleware/requireAuth");

router.get("/", requireAuth, getCommentsForTaskController);
router.post("/", requireAuth, createCommentForTaskController);

module.exports = router;
