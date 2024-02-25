const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Simanshu@123',
    database: 'E_Commerce'
});

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          reject(err);
          return;
        }
        console.log('Connected to MySQL database');
        resolve();
      });
    });
  };
  
  module.exports = { connection, connectToDatabase };