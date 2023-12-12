require("dotenv").config();
//require("./config/database").connect();
const express = require('express');
const app = express();
const port = 3000
app.use(express.json());
const customerApiRoutes = require("./routes/api/customers/account");
app.use("/api/V1/customers/account", customerApiRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});