const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/:postId", auth, commentCtrl.createComment);
router.put("/:commentId", auth, commentCtrl.updateComment);
router.delete("/:commentId", auth, commentCtrl.deleteComment);
router.get("/one/:commentId", auth, commentCtrl.getOneComment);
router.get("/all/:postId", auth, commentCtrl.getAllComment);

module.exports = router;
