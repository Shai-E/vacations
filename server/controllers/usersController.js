const router = require('express').Router();
const authLogic = require("../logic/authLogic");

router.get("/usernames", authLogic.getAllUsernames);
router.post("/logout", authLogic.logout);
router.post("/login", authLogic.login);
router.get("/token", authLogic.refresh);
router.delete("/:id/token", authLogic.revokeRefreshTokensForUser);
router.post("/", authLogic.register);

module.exports = router;