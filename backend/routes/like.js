const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.get("/post/like/:postId", auth, likeCtrl.like);
router.get("/post/dislike/:postId", auth, likeCtrl.dislike);

module.exports = router;
