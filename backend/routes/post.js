const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");

router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.getOnePost);
router.get("/", postCtrl.getAllPost);

module.exports = router;
