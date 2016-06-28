var mysql = require('mysql');
var db = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'wasel',
  password : 'wasel',
  database : 'wasel'
});
module.exports = db;
