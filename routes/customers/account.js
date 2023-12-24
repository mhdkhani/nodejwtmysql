var express = require('express');
const helper = require("../../helper/urlHelper");
const auth = require("../../middleware/auth");
const {registerPost, loginPost} = require("../../controller/api/V1/customers/account");
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
        loginPostUrl:helper.getUrl(req,'/customers/account/login'),
        userIsLoggedIn:false,
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        scripts:
            [
                helper.getUrl(req,'/js/jquery.min.js'),
                helper.getUrl(req,'/js/main.js'),
                helper.getUrl(req,'/js/customer/account.js')
            ],
        layout: './layout/one-column'
    });
});

/* POST user login form. */
router.post("/login", loginPost);

/* GET user register form. */
router.get('/register/', function(req, res, next) {
    var homeUrl = helper.getUrl(req,'/');
    var bootstrapCssUrl = helper.getUrl(req,'/css/bootstrap.min.css');
    res.render('users/register_form', {
        title: 'Express' ,
        userIsLoggedIn:false,
        homeUrl:helper.getUrl(req,'/'),
        registerPostUrl:helper.getUrl(req,'/customers/account/register'),
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        scripts:
            [
                helper.getUrl(req,'/js/jquery.min.js'),
                helper.getUrl(req,'/js/main.js'),
                helper.getUrl(req,'/js/customer/account.js')
            ],
        layout: './layout/one-column'
    });
});

/* POST user register form. */
router.post("/register", registerPost);

/* GET user dashboard. */
router.get('/dashboard/', auth , function(req, res, next) {
    var homeUrl = helper.getUrl(req,'/');
    var bootstrapCssUrl = helper.getUrl(req,'/css/bootstrap.min.css');
    res.render('users/dashboard', {
        title: 'Express' ,
        userIsLoggedIn:false,
        homeUrl:helper.getUrl(req,'/'),
        registerPostUrl:helper.getUrl(req,'/customers/account/register'),
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        scripts:
            [
                helper.getUrl(req,'/js/jquery.min.js'),
                helper.getUrl(req,'/js/main.js'),
                helper.getUrl(req,'/js/customer/account.js')
            ],
        layout: './layout/one-column'
    });
});

module.exports = router;
