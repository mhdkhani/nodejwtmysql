const loginRequired = ['email','password'];
const registerRequired = ['name','email','password'];
const Helper = require('./helper.js');
module.exports = new class inputValidation  extends Helper {
    checkRequiredForm (request,formName){
        var response = {status:true,msg: ''}
        var fields = [];
        switch (formName){
            case 'login_form':
                fields = loginRequired;
                break;
            case 'register_form':
                fields = registerRequired;
                break;
        }
        var errorMsg = [];
        for (var i = 0 ; i < fields.length ; i++){
            if (!request.body[fields[i]] || request.body[fields[i]] === '' || request.body[fields[i]] === ' '){
                errorMsg.push(this.translate('%s is required.',fields[i]));
            }
        }
        if (errorMsg.length){
            response = {status:false,msg: errorMsg.join(',') }
        }
        return response;
    }
}