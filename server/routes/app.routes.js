const { Router } = require("express");
const router = Router();
const abmCtrl = require("../controllers/abm.controller");
const authCtrl = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get("/auth/users", abmCtrl.listUsers);
router.post("/auth/register", abmCtrl.createUser);
router.get("/auth/user/avatars", abmCtrl.usedAvatars)
router.get("/auth/user/:profile", abmCtrl.loguedUser);


router.post("/auth/login", authCtrl.handleLogin);





module.exports = router;
