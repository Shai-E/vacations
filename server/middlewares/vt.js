require('dotenv').config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, _res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        err.code = 401;
            err.message = "No Token Sent."
            return next(err);};
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
        if(err) {
            err.code = 403;
            err.message = "Invalid Token."
            return next(err);
        };
        req.user = payload;
        next();
    });
}

module.exports = verifyToken;