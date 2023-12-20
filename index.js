require("dotenv").config();
const i18n = require('./i18n.config');
const express = require('express');
const app = express();
const port = 3000
app.use(express.json());
const customerApiRoutes = require("./routes/api/customers/account");
app.use("/api/V1/customers/account", customerApiRoutes);
app.listen(port, () => {
    /*console.log(i18n.getLocales()); // ['en', 'fa']
    console.log(i18n.getLocale()); // 'en'
    console.log(i18n.__('Hello')); // 'Hello'
    console.log(i18n.__('You have %s message', 5)); // 'You have 5 messages'*/
    console.log(`Example app listening on port ${port}`)
});