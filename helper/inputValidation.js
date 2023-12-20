const loginRequired = ['email','password'];
const registerRequired = ['name','email','password'];
const i18n = require('../i18n.config');
exports.checkRequiredForm = (request,formName) => {
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
            errorMsg.push(i18n.__('%s is required.', fields[i]));
        }
    }
    if (errorMsg.length){
        response = {status:false,msg: errorMsg.join(',') }
    }
    return response;
};