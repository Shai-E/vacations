const {executeWithParams} = require("../data-access/dal");
const setData = require("./setVacationsData");
const { v4 } = require("uuid");
const fs = require("fs");

const addVacation = async (req, res, next) => {
    try {
        const { description, destination, startDate, endDate, price } = req.body;
        const sql = `INSERT INTO vacations (description, destination, start_date, end_date, price) VALUES (?, ?, ?, ?, ?);`;
        const params = [description, destination, startDate, endDate, price];
        const result = await executeWithParams(sql, params);
        const data = await setData(req.user.id ,result.insertId, "Successfully Added Vacation.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const uploadPicture = async (req, res, next) => {
    try {
        const vacationId = +req.params.id;
        const uploadsPath = "../client/public/assets/uploads";

        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }
        if (!req.files) {
            const err = {code: 400, message: "No file sent."};
            return next(err);
        }
        const image = req.files.image;
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const imageName = v4() + extension;
        image.mv(`${uploadsPath}/${imageName}`);

        const sql = `UPDATE vacations SET picture = ? WHERE id = ?`;
        const params = [imageName, vacationId];
        await executeWithParams(sql, params);

        const data = await setData(req.user.id ,vacationId, "Successfully Updated Picture.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const updateVacation = async (req, res, next) => {
    try {
        const vacationId = +req.params.id;
        const { description, destination, startDate, endDate, price } = req.body;
        const sql = `UPDATE Vacations SET description = ?, destination = ?, start_date = ?, end_date = ?, price = ? WHERE id = ?`;
        const params = [description, destination, startDate, endDate, price, vacationId];
        await executeWithParams(sql, params);
        const data = await setData(req.user.id ,vacationId, "Successfully Updated Vacation.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const removeVacation = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const sql = `DELETE FROM Vacations WHERE id = ?`;
        await executeWithParams(sql, [id]);
        const data = await setData(req.user.id, id, "Successfully Deleted Vacation.");
        res.json(data);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

module.exports = {
    addVacation,
    updateVacation,
    removeVacation,
    uploadPicture,
};
