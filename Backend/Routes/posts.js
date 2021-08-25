const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/",auth,multer, postCtrl.createPost);
router.put ("/:id",auth, multer, postCtrl.modifyPost);
router.delete ("/:id",auth, sauceCtrl.deletePost);
router.get("/:id", auth, sauceCtrl.getOnePost);
router.get("/",auth, sauceCtrl.getAllPost);

module.exports = router;
