const ApiController = require("../ApiController");
const apiResponseHelper = require("../../../../helper/apiResponse");
const inputValidationHelper = require("../../../../helper/inputValidation");
const userModel = require('../../../../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const i18n = require("../../../../i18n.config");
module.exports = new class AccountController extends ApiController{
    async loginPost(request, response){
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
                        { user_id: result[0].id, email: result[0].email,name: result[0].name},
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    result[0].token = token;
                    //set cookie
                    let minute = 60 * 1000;
                    response.cookie('customer_token', token, { maxAge: minute });
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
    async registerPost(request, response){
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
                        { user_id: newUser[0].id, email: newUser[0].email,name: newUser[0].name},
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
    async dashboardPost(request, response){
        try {
            apiResponseHelper.jsonRes(response, 200, '',{user: request.user });
        } catch (err) {
            apiResponseHelper.jsonRes(response, 500,  err.message,{});
        }
    }
    async editPost(request, response){
        try {
            var checkRequired = inputValidationHelper.checkRequiredForm(request,'edit_form');
            if (!checkRequired.status){
                throw new Error (checkRequired.msg);
            }
            // Get user input
            const {name,email} = request.body;
            let user =  await userModel.find( request.user.user_id);
            if (user[0]){
                let checkUser =  await userModel.findByField('email', email);
                if (checkUser[0] && checkUser[0].id != user[0].id){
                    apiResponseHelper.jsonRes(response, 409, i18n.__('user already exists.') , {});
                }else{
                    var newEditData = {name:name,email:email };
                    var continueEdit = true;
                    if (request.body['change_password'] && request.body['change_password'] === 'yes'){
                        continueEdit = false;
                        if ((await bcrypt.compare(request.body['current_password'], checkUser[0].password))){
                            if (request.body['new_password'] == request.body['confirm_new_password']){
                                var encryptedPassword = await bcrypt.hash(request.body['new_password'], 10);
                                continueEdit = true;
                                newEditData = {name:name,email:email,password:encryptedPassword};
                            }else{
                                throw new Error (i18n.__('New Password And Confirm Password Does Not Match'));
                            }
                        }else{
                            throw new Error (i18n.__('password does not match.'));
                        }
                    }
                    if (continueEdit){
                        var editUser = await userModel.update(request.user.user_id,newEditData);
                        if (editUser[0]){
                            const token = jwt.sign(
                                { user_id: editUser[0].id, email: editUser[0].email,name: editUser[0].name},
                                process.env.TOKEN_KEY,
                                {
                                    expiresIn: "2h",
                                }
                            );
                            editUser[0].token = token;
                            //set cookie
                            let minute = 60 * 1000;
                            response.cookie('customer_token', token, { maxAge: minute });
                            apiResponseHelper.jsonRes(response, 200, '',{user: editUser[0] });
                        }else{
                            throw new Error(i18n.__('try again.'));
                        }
                    }else{
                        throw new Error(i18n.__('try again.'));
                    }
                }
            }else{
                apiResponseHelper.jsonRes(response, 409, i18n.__('user not found.') , {});
            }
        } catch (err) {
            apiResponseHelper.jsonRes(response, 500, err.message,{});
        }
    }
}