const express = require('express');
const mysql = require('mysql');
exports.connect = () => {
    // Connecting to the database
    // Create a MySQL connection
    const connection = mysql.createConnection ({
        host: '172.21.8.213',
        user: 'root',
        password: 'root1',
        database: 'prv2' // Use the name of the database you created
    });
    // Connect to the MySQL database
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            return;
        }
        console.log('Connected to the database as ID ' + connection.threadId);
    });
    return connection;
};