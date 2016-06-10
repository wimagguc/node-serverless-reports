
var mysql = require("mysql");

module.exports.createReports = function(resultFinishedCallback, connectionFinishedCallback) {

    var pool = mysql.createPool({
        connectionLimit : 5,
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASS,
        database : process.env.DATABASE_DB_NAME
    });

    pool.getConnection(function(err, connection) {
        if (err) {
            connectionFinishedCallback(err);
        } else {
            connection.query('SELECT username FROM auth_user', function(err2, rows, fields) {

                if (err2) {
                    resultFinishedCallback({'status': "connection error"});
                } else {
                    resultFinishedCallback({'usernames': rows});
                }

                connection.release();

                pool.end(function(err3) {
                    connectionFinishedCallback(err3);
                });

            });
        }
    });

}
