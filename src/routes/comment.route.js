const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");

router.post("/", controller.postComment);
router.delete("/", controller.deleteComment);
router.get("/", controller.getComments);
router.patch("/", controller.updateComment);

module.exports = router;