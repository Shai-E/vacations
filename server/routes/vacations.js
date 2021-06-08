const router = require("express").Router();
// const vacationsLogic = require("../logic/vacationsLogic");
const {getAllVacations, followVacationByUserId,unfollowVacation} = require("../logic/users");

router.get("/all/:id", getAllVacations);
router.post("/follow/:userId/:vacationId", followVacationByUserId);
router.delete("/unfollow/:userId/:vacationId", unfollowVacation);

const {addVacation, updateVacation, uploadPicture, removeVacation} = require("../logic/admin");
const verifyAdmin = require("../middlewares/ia");

router.post("/add", verifyAdmin, addVacation);
router.post("/update/:id", verifyAdmin, updateVacation);
router.post("/:id/picture", verifyAdmin, uploadPicture);
router.delete("/:id", verifyAdmin, removeVacation);

module.exports = router;
