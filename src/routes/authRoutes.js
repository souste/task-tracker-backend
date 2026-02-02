const { Router } = require("express");
const router = Router();

const { signUp } = require("../controllers/authController");

router.post("/signup", signUp);

module.exports = router;
