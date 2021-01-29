const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DB || 'fec'
});

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
});

const db = Promise.promisifyAll(connection, {multiArgs: true});


const getSimilarProducts = (id) => {
  let queryString = `SELECT category FROM products WHERE id = ${id}`;

  return db.queryAsync(queryString).spread(results => results)
    .then(results => {
      let category = results[0].category;

      queryString = `SELECT id, name, imageUrl, rating, reviewCount, isFavorite, price, cutPrice FROM products WHERE category = ${category} ORDER BY RAND() LIMIT 16`;

      return db.queryAsync(queryString).spread(results => results);
    });

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