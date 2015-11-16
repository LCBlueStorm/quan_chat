var dbconfig = require('./db_config');
var mysql = require('mysql');

module.exports = mysql.createPool({
  host: dbconfig.HOST,
  port: dbconfig.PORT,
  database: dbconfig.DB,
  user: dbconfig.USER,
  password: dbconfig.PASSWORD,
});
 