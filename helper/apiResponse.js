exports.jsonRes = (response,code,msg) => {
   var statusFlag = false;
   if (code === 200){
      statusFlag = true;
   }
   var res =  { status: statusFlag , obj: msg};
   response.status(code).send(res);
};