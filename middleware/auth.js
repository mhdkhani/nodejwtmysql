const jwt = require("jsonwebtoken");
const apiResponseHelper = require("../helper/apiResponse");
const i18n = require('../i18n.config');
const config = process.env;
//if login, has access
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.customer_token;

    if (!token) {
        return apiResponseHelper.jsonRes(res,req, 403,'', i18n.__("A token is required for authentication"),{});
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return apiResponseHelper.jsonRes(res,req, 401,'', i18n.__("Invalid Token"),{});
    }
    return next();
};

module.exports = verifyToken;