const Helper = require("./helper.js");
module.exports = new class inputValidation  extends Helper {
   jsonRes(response,request,code,redirectPath,msg,obj){
      var statusFlag = false;
      if (code === 200){
         statusFlag = true;
         msg = 'success';
      }
      var redirect = '';
      if (redirectPath && redirectPath !== ''){
         redirect = this.getUrl(request,redirectPath);
      }
      var res =  { status: statusFlag , message:msg,redirect:redirect , obj};
      response.status(code).send(res);
   }
}