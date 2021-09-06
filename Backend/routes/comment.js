const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/:postId", commentCtrl.createComment);
router.put ("/:commentId",auth, commentCtrl.updateComment);
router.delete ("/:commentId", auth, commentCtrl.deleteComment);
router.get("/:commentId", auth, commentCtrl.getOneComment);
router.get("/:postId", auth, commentCtrl.getAllComment);

module.exports = router;
