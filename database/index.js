const mysql = require('mysql');
const Promise = require('bluebird');

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


const getSimilarProducts = (category) => {
  let queryString = `SELECT id, name, imageUrl, rating, reviewCount, isFavorite, price, cutPrice FROM products WHERE category = ${category} ORDER BY RAND() LIMIT 16`;

  return db.queryAsync(queryString).spread(results => results);
};

const getFavorites = () => {
  let queryString = `SELECT id, name, description, imageUrl, rating, reviewCount, isFavorite, price, cutPrice FROM products WHERE isFavorite = ${1}`;

  return db.queryAsync(queryString).spread(results => results);
};

const addFavorite = (productId) => {
  let queryString = `UPDATE products SET isFavorite = 1 WHERE id = ${productId}`;
  return db.queryAsync(queryString);
};

const removeFavorite = (productId) => {
  let queryString = `UPDATE products SET isFavorite = 0 WHERE id = ${productId}`;
  return db.queryAsync(queryString);
};


module.exports = {
  getSimilarProducts: getSimilarProducts,
  getFavorites: getFavorites,
  addFavorite: addFavorite,
  removeFavorite: removeFavorite
};