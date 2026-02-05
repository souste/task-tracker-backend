const { Router } = require("express");
const router = Router({ mergeParams: true });

const { createCommentForTaskController } = require("../controllers/commentsController");
const { requireAuth } = require("../middleware/requireAuth");

router.post("/", requireAuth, createCommentForTaskController);

module.exports = router;
