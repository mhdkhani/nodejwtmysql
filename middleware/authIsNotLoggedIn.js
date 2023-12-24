const jwt = require("jsonwebtoken");
const apiResponseHelper = require("../helper/apiResponse");
const helper = require("../helper/urlHelper");
const i18n = require('../i18n.config');
const config = process.env;
const verifyTokenCheck = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.customer_token;
    try {
        if (token) {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            if (!decoded.email || decoded.email === ''){
              return   helper.redirect(res,req,'/customers/account/login',200);
            }else{
                req.user = decoded;
            }
        }else{
            return   helper.redirect(res,req,'/customers/account/login',200);
        }
    } catch (err) {
        return  helper.redirect(res,req,'/customers/account/login',200);
    }
    return next();
};

module.exports = verifyTokenCheck;