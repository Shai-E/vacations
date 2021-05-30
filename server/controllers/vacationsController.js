const router = require("express").Router();
// const vacationsLogic = require("../logic/vacationsLogic");
const adminLogic = require("../logic/adminVacationsLogic");
const usersLogic = require("../logic/usersVacationsLogic");
const verifyAdmin = require("../middlewares/ia");

router.get("/all/:id", usersLogic.getAllVacations);
router.post("/follow/:userId/:vacationId", usersLogic.followVacationByUserId);
router.delete("/unfollow/:userId/:vacationId", usersLogic.unfollowVacation);
router.post("/add", verifyAdmin, adminLogic.addVacation);
router.post("/update/:id", verifyAdmin, adminLogic.updateVacation);
router.post("/:id/picture", verifyAdmin, adminLogic.uploadPicture);
router.delete("/:id", verifyAdmin, adminLogic.removeVacation);

module.exports = router;
