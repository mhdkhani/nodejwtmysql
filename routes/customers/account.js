var express = require('express');
const helper = require("../../helper/urlHelper");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET user login form. */
router.get('/login/', function(req, res, next) {
    res.render('users/login_form', {
        title: 'Express' ,
        homeUrl:helper.getUrl(req,'/'),
        userIsLoggedIn:false,
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        layout: './layout/one-column'
    });
});

/* GET user register form. */
router.get('/register/', function(req, res, next) {
    var homeUrl = helper.getUrl(req,'/');
    var bootstrapCssUrl = helper.getUrl(req,'/css/bootstrap.min.css');
    res.render('users/register_form', {
        title: 'Express' ,
        userIsLoggedIn:false,
        homeUrl:helper.getUrl(req,'/'),
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        layout: './layout/one-column'
    });
});

module.exports = router;
