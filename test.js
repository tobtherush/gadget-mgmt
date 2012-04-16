var mysql = require('mysql');
var TEST_DATABASE = 'nodejs_mysql_test';
var TEST_TABLE = 'test';
var client = mysql.createClient({
  user: 'root',
  password: 'root',
  database: 'test'
});

client.query('select * from der_geraet', function(err, data) {
  /*if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
    throw err;
  }*/
  console.log(err, data)
});

