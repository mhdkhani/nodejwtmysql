var express = require('express');
const helper = require("../../helper/urlHelper");
const auth = require("../../middleware/auth");
const authIsLoggedIn = require("../../middleware/authIsLoggedIn");
const authIsNotLoggedIn = require("../../middleware/authIsNotLoggedIn");
const {registerPost, loginPost,editPost} = require("../../controller/api/V1/customers/account");
const {logout} = require("../../controller/customer/account");
var router = express.Router();


/* GET user login form. */
router.get('/login/', authIsLoggedIn,function(req, res, next) {
    res.render('users/login_form', {
        title: 'Express' ,
        homeUrl:helper.getUrl(req,'/'),
        loginPostUrl:helper.getUrl(req,'/customers/account/login'),
        userIsLoggedIn:false,
        bootstrapCssUrl:helper.getUrl(req,'/css/bootstrap.min.css'),
        styles:[
            helper.getUrl(req,'/css/bootstrap.min.css'),
            helper.getUrl(req,'/css/lib/popupS.min.css')
        ],
        scripts:
            [
                helper.getUrl(req,'/js/jquery.min.js'),
                helper.getUrl(req,'/js/lib/popupS.min.js'),
                helper.getUrl(req,'/js/main.js'),
                helper.getUrl(req,'/js/customer/account.js')
            ],
        layout: './layout/one-column'
    });
});

/* POST user login form. */
router.post("/login", loginPost);

/* GET user register form. */
router.get('/register/', authIsLoggedIn,function(req, res, next) {
    var homeUrl = helper.getUrl(req,'/');
    var bootstrapCssUrl = helper.getUrl(req,'/css/bootstrap.min.css');
    res.render('users/register_form', {
        title: 'Express' ,
        userIsLoggedIn:false,
        homeUrl:helper.getUrl(req,'/'),
        registerPostUrl:helper.getUrl(req,'/customers/account/register'),
        styles:[
            helper.getUrl(req,'/css/bootstrap.min.css'),
            helper.getUrl(req,'/css/lib/popupS.min.css')
        ],
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
router.get('/dashboard/', authIsNotLoggedIn , function(req, res, next) {
    var homeUrl = helper.getUrl(req,'/');
    var bootstrapCssUrl = helper.getUrl(req,'/css/bootstrap.min.css');
    res.render('users/dashboard', {
        title: 'Express' ,
        userIsLoggedIn:false,
        userData:req.user,
        homeUrl:helper.getUrl(req,'/'),
        editPostUrl:helper.getUrl(req,'/customers/account/edit'),
        logoutUrl:helper.getUrl(req,'/customers/account/logout'),
        styles:[
            helper.getUrl(req,'/css/bootstrap.min.css'),
            helper.getUrl(req,'/css/lib/popupS.min.css')
        ],
        scripts:
            [
                helper.getUrl(req,'/js/jquery.min.js'),
                helper.getUrl(req,'/js/main.js'),
                helper.getUrl(req,'/js/customer/account.js')
            ],
        layout: './layout/one-column'
    });
});

/* GET user logout. */
router.get('/logout/', logout );

/* POST user edit form. */
router.post("/edit", authIsNotLoggedIn ,editPost);

module.exports = router;
