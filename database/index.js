const { Pool, Client } = require('pg');

const pool = new Pool();
const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'sdc',
  password: 'SQLiseasy1313',
  port: 5432,
});
await client.connect();

const res = await client.query('SELECT $1:: text as message', ['Hello World!'])
console.log(res.rows[0].message);
await client.end();

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