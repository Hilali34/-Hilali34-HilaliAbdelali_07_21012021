const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");



router.get("/:userId",auth,profileCtrl.getUserProfile);
router.put("/:userId",auth,profileCtrl.updateUserProfile);
router.delete("/:userId",auth,profileCtrl.deleteUserProfile);


module.exports = router;
