exports.customerAccountsTables = (connection) => {
    //customer table
    var sql = "CREATE TABLE IF NOT EXISTS `users_no_test` (id int(11) unsigned NOT NULL auto_increment,name VARCHAR(255) NOT NULL, email VARCHAR(255) NULL,password VARCHAR(255) NOT NULL,PRIMARY KEY  (`id`))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
}