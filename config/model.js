const db = require('../config/database').connect();

module.exports =  class Model {

    constructor(table,primaryField){
        this.table = table;
        this.primary_field = primaryField;
    }

    get_all(){
        let cThis = this;
        return new Promise(function(myResolve, myReject) {
            db.query('SELECT * FROM ??',[cThis.table], function (error, result) {
                if (error) throw  error;
                myResolve( result );
            });
        });
    }

    find(id){
        let cThis = this;
        var query = 'SELECT * FROM '+cThis.table+' WHERE '+cThis.primary_field+' = "'+id+'" ' ;
        return this.runQuery(db,query);
    }

    findByField(field,value){
        let cThis = this;
        var query = 'SELECT * FROM '+cThis.table+' WHERE '+field+' = "'+value+'" ' ;
        return this.runQuery(db,query);
    }

    findByFieldtest(field,value){
        let cThis = this;
        return new Promise(function(myResolve, myReject) {
            db.query('SELECT * FROM '+cThis.table+' WHERE '+field+' = ?',[value], function (error, result) {
                //db.query('SELECT * FROM ? WHERE '+field+' = ?',[cThis.table,value], function (error, result) {
                if (error) throw error;
                myResolve( result[0] );
            })
        });

    }

    create(data){
        let cThis = this;
        return new Promise(function(myResolve, myReject) {
            db.query('INSERT INTO ?? SET ?',[ cThis.table,data], function (error, result) {
                if (error) throw error;
                let data =  cThis.find(result.insertId);
                data.then( function(value){ myResolve( value )})
                    .catch( function(error){ myReject(error)});

            });
        });
    }

    update(id,data){
        let cThis = this;
        return new Promise(function(myResolve, myReject) {
            db.query('UPDATE  ?? SET ? WHERE id = ?',[ cThis.table,data,id], function (error, result) {
                if (error) throw  error;
                let data =  cThis.find(id);
                data.then( function(value){ myResolve( value )})
                    .catch( function(error){ myReject(error)});

            });
        });
    }

    delete(id){
        let cThis = this;
        return new Promise(function(myResolve, myReject) {
            db.query('DELETE FROM  ??  WHERE id = ?',[ cThis.table,id], function (error, result) {
                if (error) throw  error;
                myResolve( result )

            });
        });
    }


    runQuery(con,query) {
        return new Promise((resolve, reject) =>{
            try{
                con.query(query, function (err, result) {
                    if (err){
                        return reject(err)
                    }
                    return resolve(result)
                });
            }
            catch(e){
                reject(e)
            }
        })
    };

}