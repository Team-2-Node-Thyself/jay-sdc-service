const mysql = require('mysql');
const Promise = require('bluebird');
const mockData = require('./mockData');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fec'
});

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

const db = Promise.promisifyAll(connection, {multiArgs: true});

for (let i = 0; i < mockData.categories.length; i++) {
  let queryString = `INSERT INTO categories (name) VALUES ("${mockData.categories[i].name}")`;
  db.queryAsync(queryString)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

let products = mockData.products;

for (let i = 0; i < products.length; i++) {
  let queryString = `INSERT INTO products (name, description, imageUrl, category, isFavorite, price, cutPrice, rating, reviewCount) VALUES ("${products[i].name}", "${products[i].description}", "${products[i].imageUrl}", ${products[i].category}, ${products[i].isFavorite}, ${products[i].price}, ${products[i].cutPrice}, ${products[i].rating}, ${products[i].reviewCount})`;

  db.queryAsync(queryString)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}