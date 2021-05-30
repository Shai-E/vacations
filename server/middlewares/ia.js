const isAdmin = (req, _res, next) => {
    req.user.isAdmin ? next(): next({code:403, message:"No access"});
}

module.exports = isAdmin;