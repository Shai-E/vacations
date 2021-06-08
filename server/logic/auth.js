require("dotenv").config();
const {execute, executeWithParams} = require("../data-access/dal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsernames = async (req, res, next) => {
    try{
        const sql = `SELECT username FROM users`;
        const result = await execute(sql);
        let usernames = [];
        for (let username of result) {
            for (let key in username) {
                usernames.push(username[key]);
            }
        }
        res.json(usernames);
    } catch(err) {
        err.code = 500;
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.body.id;
        const sql = `SELECT users.id, username, first_name AS firstName, last_name AS lastName, password, is_admin AS isAdmin FROM users WHERE id = ${id}`;
        const user = await execute(sql);
        return res.json(user);
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const genAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const genRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const getUserByUsername = async (userInfo) => {
    const { username } = userInfo;
    const sql = `SELECT users.id, username, first_name AS firstName, last_name AS lastName, password, is_admin AS isAdmin FROM users WHERE username = ?`;
    const [user] = await executeWithParams(sql, [username]);
    return user;
};

const saveRefreshToken = async (token, userId) => {
    try {
    const sql = `INSERT INTO tokens(token, user_id)
        VALUES(?,?)`;
        const parameters = [token, userId];
        return await executeWithParams(sql, parameters);
    } catch (err) {
        return res.status(500).send(err);
    }
};
    

const sendRefreshToken = (res, token) => {
    res.cookie("jid", token, { httpOnly: true });
};

const setUserWithTokens = async (user, res) => {
    delete user.password;
    if(user.isAdmin === undefined) user.isAdmin = 0;
    user.lastVisit = Date.now();
    const formattedUser = { ...user };
    const tokenInfo = { user: formattedUser.username, id: formattedUser.id, isAdmin: formattedUser.isAdmin };
    const accessToken = genAccessToken(tokenInfo);
    const refreshToken = genRefreshToken(tokenInfo);
    try{
        await saveRefreshToken(refreshToken, formattedUser.id);
        formattedUser.accessToken = accessToken;
        sendRefreshToken(res, refreshToken);
        return formattedUser;
    }
    catch(err) {
        return res.status(500).send(err);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.body);
        if (!user) {
            const err = {code: 403, message: "Wrong username or password"};
            return next(err);
        };
        const { password } = req.body;
        if (await bcrypt.compare(password, user.password)) {
            const userData = await setUserWithTokens(user, res);
            return res.json(userData);
        } else {
            const err = {code: 403, message: "Wrong username or password"};
            return next(err);
        };
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = isAdmin || false;
        const parameters = [firstName, lastName, username, hashedPassword, admin];
        const sql = `INSERT INTO users(first_name, last_name, username, password, is_admin)
        VALUES(?,?,?,?,?)`;
        const info = await executeWithParams(sql, parameters);
        const id = info.insertId;
        const userData = await setUserWithTokens({ firstName, lastName, username, isAdmin, id }, res);
        return res.json({ userData, message: `Registered successfully as ${userData.username}!` });
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.jid;
        if (!refreshToken) {
            const err = {code: 401, message: "No refresh token in cookies"};
            return next(err);
        };
        const tokenSql = `SELECT * FROM tokens WHERE token = ?`;
        const isRefreshTokenExist = await executeWithParams(tokenSql, [refreshToken]);
        if (isRefreshTokenExist.length === 0) {
            const err = {code: 403, message: "couldn't verify token"};
            return next(err);
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
            if (err) {
                const err = {code: 403, message: "couldn't verify token"};
                return next(err);
            }
            const tokenInfo = { user: payload.user, id: payload.id, isAdmin: payload.isAdmin };
            const accessToken = genAccessToken(tokenInfo);
            const newRefreshToken = genRefreshToken(tokenInfo);
            sendRefreshToken(res, newRefreshToken);
            await saveRefreshToken(newRefreshToken, payload.id);
            res.json({ accessToken: accessToken });
        });
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const revokeRefreshTokensForUser = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const sql = `DELETE FROM tokens WHERE user_id = ?`;
        const result = await executeWithParams(sql, [id]);
        res.status(200).json(result)
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        const sql = `DELETE FROM tokens WHERE token = ?`;
        const token = req.cookies.jid;
        res.clearCookie("jid");
        if (!token) return;
        await executeWithParams(sql, [token]);
        return res.json({ message: "User is logged out" });
    } catch (err) {
        err.code = 500;
        next(err);
    }
};

module.exports = {
    getAllUsernames,
    getUserById,
    login,
    register,
    refresh,
    logout,
    revokeRefreshTokensForUser,
};
