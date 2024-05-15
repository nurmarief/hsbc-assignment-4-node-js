const express = require("express");
const router = express.Router();

const controller = require("../controllers/post.controller")

router.post("/", controller.postPost);
router.delete("/", controller.deletePost);
router.get("/", controller.getPosts);
router.patch("/", controller.updatePost);

module.exports = router;