const express = require('express');
const mysql = require('mysql');
const customerAccountTables = require('./tables/customer/account');
exports.connect = () => {
    // Connecting to the database
    // Create a MySQL connection
    const connection = mysql.createConnection ({
        host: 'IP',
        user: 'uname',
        password: 'pass',
        database: 'db_name'
    });
    // Connect to the MySQL database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            return;
        }
        console.log('Connected to the database as ID ' + connection.threadId);
    });
    //create table when application run
    customerAccountTables.customerAccountsTables(connection);
    return connection;
};
