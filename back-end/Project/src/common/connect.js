let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'registrytotal'
})

connection.connect(function (err) {
    if (err) console.log('connection error');
});

module.exports = connection;