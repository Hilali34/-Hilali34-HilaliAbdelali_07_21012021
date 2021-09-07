const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.get('/like/:postId/:userId', likeCtrl.like);
router.get('/dislike/:postId/:userId', likeCtrl.dislike);

module.exports = router;
