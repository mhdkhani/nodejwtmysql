const i18n = require('../i18n.config');
module.exports =  class Helper {
    translate(text,params){
        return i18n.__(text,params);
    }
}