const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const db = require('../database');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8000'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/bundle', express.static('public/bundle.js'));

app.get('/products/similar/:category', (req, res) => {
  let category = req.params.category;
  db.getSimilarProducts(category)
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/products/favorites', (req, res) => {
  db.getFavorites()
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.patch('/products/favorites/add/:id', (req, res) => {
  let id = req.params.id;
  db.addFavorite(id)
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});

app.patch('/products/favorites/remove/:id', (req, res) => {
  let id = req.params.id;

  db.removeFavorite(id)
    .then(() => {
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

});


app.listen(port, () => {
  console.log(`listening at ${port}`);
});