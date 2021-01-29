const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || ''
});

connection.connect(err => {
  if (err) {
    console.log(err);
  }
});

const db = Promise.promisifyAll(connection, {multiArgs: true});


db.queryAsync('CREATE DATABASE IF NOT EXISTS fec;')
  .then(() => {
    return db.queryAsync('USE fec;');
  })
  .then(() => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS products ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64), description VARCHAR(120), imageUrl VARCHAR(120), category INT, isFavorite INT, price VARCHAR(12), cutPrice VARCHAR(12), rating VARCHAR(12), reviewCount INT);');
  })
  .then(() => {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS categories ( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64));');
  })
  .then(
    process.exit
  )
  .catch(err => {
    console.log(err);
  });