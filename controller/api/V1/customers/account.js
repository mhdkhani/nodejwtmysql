const apiResponseHelper = require("../../../../helper/apiResponse");
const inputValidationHelper = require("../../../../helper/inputValidation");
const userModel = require('../../../../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const i18n = require('../../../../i18n.config');
const loginPost = async (request, response) => {
    try {
        // Get user input
        var checkRequired = inputValidationHelper.checkRequiredForm(request,'login_form');
        if (!checkRequired.status){
            throw new Error (checkRequired.msg);
        }
        const {email, password} = request.body;
        let result =  await userModel.findByField('email', email);
        if (result[0]){
            if ((await bcrypt.compare(password, result[0].password))){
                const token = jwt.sign(
                    { user_id: result[0].id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                result[0].token = token;
                apiResponseHelper.jsonRes(response, 200, '',{user: result[0] });
            }else{
                throw new Error (i18n.__('password does not match.'));
            }
        }else{
            throw new Error (i18n.__('user not found.'));
        }
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500, err.message , {});
    }
}
const registerPost = async (request, response) => {
    try {
        var checkRequired = inputValidationHelper.checkRequiredForm(request,'register_form');
        if (!checkRequired.status){
            throw new Error (checkRequired.msg);
        }
        // Get user input
        const {name,email, password} = request.body;
        let result =  await userModel.findByField('email', email);
        if (result[0]){
            apiResponseHelper.jsonRes(response, 409, i18n.__('user already exists.') , {});
        }else{
            var encryptedPassword = await bcrypt.hash(password, 10);
            var newUserData = {name:name,email:email,password:encryptedPassword };
            var newUser = await userModel.create(newUserData);
            if (newUser[0]){
                const token = jwt.sign(
                    { user_id: newUser[0].id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
                newUser[0].token = token;
                apiResponseHelper.jsonRes(response, 200, '',{user: newUser[0]});
            }else{
                throw new Error(i18n.__('try again.'));
            }
        }
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500, err.message,{});
    }
}
const dashboardPost = async (request, response) => {
    try {
        apiResponseHelper.jsonRes(response, 200, '',{user: request.user });
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500,  err.message,{});
    }
}
module.exports = {loginPost,registerPost,dashboardPost}