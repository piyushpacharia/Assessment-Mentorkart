const express = require("express");
const { sendMail, fetchMails } = require("../controllers/FormData");
const { isLoggedIn } = require("../middlewares/general");
const router = express.Router();

router.post("/send-mail",isLoggedIn,sendMail);
router.get("/fetch-mails",isLoggedIn,fetchMails);

module.exports = router;