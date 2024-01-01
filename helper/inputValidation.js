const loginRequired = ['email','password'];
const registerRequired = ['name','email','password'];
const editRequired = ['name','email'];
const editWithPassRequired = ['name','email','current_password','new_password','confirm_new_password'];
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
            case 'edit_form':
                if (request.body['change_password'] && request.body['change_password'] === 'yes'){
                    fields = editWithPassRequired;
                }else{
                    fields = editRequired;
                }
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