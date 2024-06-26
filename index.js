require("dotenv").config();
const i18n = require('./i18n.config');
const express = require('express');
const app = express();
const path = require("path");
var cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const customerApiRoutes = require("./routes/api/customers/account");
const customerRoutes = require("./routes/customers/account");
const port = 5000
app.use(express.json());
app.use(cookieParser())
//assets
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/css", express.static(path.join(__dirname, "public/stylesheets")));
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "public/javascripts")));
// view engine setup
app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/* ROUTES */
app.use("/api/V1/customers/account", customerApiRoutes);
app.use("/customers/account", customerRoutes);
app.listen(port, () => {
    /*console.log(i18n.getLocales()); // ['en', 'fa']
    console.log(i18n.getLocale()); // 'en'
    console.log(i18n.__('Hello')); // 'Hello'
    console.log(i18n.__('You have %s message', 5)); // 'You have 5 messages'*/
    console.log(`Example app listening on port ${port}`)
});
