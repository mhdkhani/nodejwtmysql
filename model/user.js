const Model = require('../config/model.js');
module.exports =  new class user extends Model {
    constructor(){
        super('users_no_test','id');
    }
}