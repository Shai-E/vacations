const dal = require("../dal/dal");
const setData = require("./setVacationsData");

const getAllVacations = async (req, res, next) => {
    try{
        const id = +req.params.id;
        const data = await setData(id, undefined, "");
        res.json(data);
    }catch(err){
        err.code = 500;
        next(err);
    }
};

const followVacationByUserId = async (req, res, next) => {
    try {
        const vacationId = +req.params.vacationId;
        const userId = +req.params.userId;
        const sql = `INSERT INTO followers (vacation_id, user_id) VALUES(?,?);`;
        await dal.executeWithParams(sql, [vacationId, userId]);
        const data = await setData(userId, vacationId, "Vacation is now followed.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const unfollowVacation = async (req, res, next) => {
    try {
        const vacationId = +req.params.vacationId;
        const userId = +req.params.userId;
        const sql = `DELETE fROM followers WHERE vacation_id = ? and user_id = ?;`;
        await dal.executeWithParams(sql, [vacationId, userId]);
        const data = await setData(userId, vacationId, "Vacation is unfollowed.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

module.exports = {
    getAllVacations,
    followVacationByUserId,
    unfollowVacation,
};
