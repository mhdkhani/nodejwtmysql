const Controller = require("../Controller");
const helper = require("../../helper/urlHelper");
module.exports = new class AccountController extends Controller{
    logout(request,response){
        response.clearCookie("customer_token");
        helper.redirect(response,request,'/customers/account/login',301);
    }
}