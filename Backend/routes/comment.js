const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/:postId", commentCtrl.createComment);
router.put ("/:commentId", commentCtrl.updateComment);
router.delete ("/:commentId", commentCtrl.deleteComment);
router.get("/one/:commentId", commentCtrl.getOneComment);
router.get("/all/:postId", commentCtrl.getAllComment);

module.exports = router;
