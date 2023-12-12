const loginRequired = ['email','password'];
const registerRequired = ['name','email','password'];
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
            errorMsg.push(fields[i] + ' is required.');
        }
    }
    if (errorMsg.length){
        response = {status:false,msg: errorMsg.join(',') }
    }
    return response;
};