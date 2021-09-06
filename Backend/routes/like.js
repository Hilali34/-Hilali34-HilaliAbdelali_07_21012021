const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

router.get('/like/:postId/:userId', auth, likeCtrl.like);
router.get('/dislike/:postId/:userId', auth, likeCtrl.dislike);

module.exports = router;
