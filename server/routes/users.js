const router = require('express').Router();
const {getAllUsernames, logout, login, refresh, revokeRefreshTokensForUser, register} = require("../logic/auth");

router.get("/usernames", getAllUsernames);
router.post("/logout", logout);
router.post("/login", login);
router.get("/token", refresh);
router.delete("/:id/token", revokeRefreshTokensForUser);
router.post("/", register);

module.exports = router;