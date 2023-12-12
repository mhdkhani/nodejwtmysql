const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const {loginPost} = require('../../../controller/api/V1/customers/account');
const {registerPost} = require('../../../controller/api/V1/customers/account');
const {dashboardPost} = require('../../../controller/api/V1/customers/account');

/*
 * @route /api/V1/customers/account/login
 * @params  { "email": "ddddd@g.com", "password": "123"}
 */
router.post("/login", loginPost);

/*
 * @route /api/V1/customers/account/register
 * @params  { "name": "omid","email": "ddddd@g.com", "password": "123"}
 */
router.post("/register", registerPost);

/*
 * @route /api/V1/customers/account/dashboard
 * @header x-access-token => your token
 */
router.post("/dashboard",auth, dashboardPost);

module.exports = router;