const express = require("express");
const { SignUp, Login, activateAccount } = require("../controllers/Auth");
const router = express.Router();

router.post("/signup",SignUp)
router.post("/login",Login)
router.get("/activate-account/:token",activateAccount)

module.exports = router;