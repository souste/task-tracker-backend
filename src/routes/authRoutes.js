const { Router } = require("express");
const router = Router();

const { signUp, login } = require("../controllers/authController");
const { requireAuth } = require("../middleware/requireAuth");

router.post("/signup", signUp);
router.post("/login", login);

router.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

module.exports = router;
