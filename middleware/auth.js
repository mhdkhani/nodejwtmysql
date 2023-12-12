const jwt = require("jsonwebtoken");
const apiResponseHelper = require("../helper/apiResponse");
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return apiResponseHelper.jsonRes(res, 403, "A token is required for authentication",{});
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return apiResponseHelper.jsonRes(res, 401, "Invalid Token",{});
    }
    return next();
};

module.exports = verifyToken;