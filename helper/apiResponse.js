exports.jsonRes = (response,code,msg,obj) => {
   var statusFlag = false;
   if (code === 200){
      statusFlag = true;
      msg = 'success';
   }
   var res =  { status: statusFlag , message:msg , obj};
   response.status(code).send(res);
};