const dal = require("../dal/dal");

const getVacations = async () => {
    try{
        const sql = `SELECT vacations.id, destination, description, picture, start_date AS startDate, end_date AS endDate, price, 
            Count(distinct followers.user_id) AS followers
            FROM vacations LEFT JOIN followers 
            ON vacations.id = followers.vacation_id
            LEFT JOIN users
            ON followers.user_id = users.id
            GROUP BY id ORDER BY start_date ASC;`;
        return await dal.execute(sql);
    }catch(err){
        console.log(err)
    }
};

const getFollowedVacationsIDsByUserId = async (userId) => {
    try{
        const id = userId;
        const sql = `SELECT vacation_id as vacations FROM followers where user_id = ?;`;
        const vacations = await dal.executeWithParams(sql, [id]);
        let IDs = [];
        for (let vacation of vacations) {
            for (let key in vacation) {
                IDs.push(vacation[key]);
            }
        }
        return IDs;
    }catch(err){
        console.log(err)
    }
};

const setData = async (userId, vacationId, message) => {
    try{
        const IDs = await getFollowedVacationsIDsByUserId(userId);
        const vacations = await getVacations();
        const data = {
            vacations,
            IDs,
            vacationId,
            message,
        };
        return data;
    }catch(err){
        console.log(err)
    }
};

module.exports = setData