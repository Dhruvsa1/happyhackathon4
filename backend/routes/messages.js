const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router.patch("/:id", messagesController.handlePrompt);
router.post("/", messagesController.post);
// router.patch("/", messagesController.patch);
router.get("/", messagesController.get);

module.exports = router;
