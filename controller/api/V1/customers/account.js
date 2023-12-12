const apiResponseHelper = require("../../../../helper/apiResponse");
const userModel = require('../../../../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginPost = async (request, response) => {
    try {
        // Get user input
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
                apiResponseHelper.jsonRes(response, 200, {user: result[0] });
            }else{
                throw new Error ('passsword');
            }
        }else{
            throw new Error ('user not found.');
        }
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500, {msg: err.message});
    }
}
const registerPost = async (request, response) => {
    try {
        // Get user input
        const {name,email, password} = request.body;
        let result =  await userModel.findByField('email', email);
        if (result[0]){
            apiResponseHelper.jsonRes(response, 409, {msg: 'user already exists.' });
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
                apiResponseHelper.jsonRes(response, 200, {user: newUser});
            }else{
                throw new Error('try again.');
            }
        }
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500, {msg: err.message});
    }
}
const dashboardPost = async (request, response) => {
    try {
        apiResponseHelper.jsonRes(response, 200, {user: request.user });
    } catch (err) {
        apiResponseHelper.jsonRes(response, 500, {msg: err.message});
    }
}
module.exports = {loginPost,registerPost,dashboardPost}