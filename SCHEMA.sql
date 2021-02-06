
-- drop if exists
DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

-- replaces USE
\c sdc;

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  description VARCHAR(120),
  imageUrl VARCHAR(120),
  category INTEGER,
  isFavorite BOOLEAN,
  price VARCHAR(12),
  cutPrice VARCHAR(12),
  rating DECIMAL,
  reviewCount INT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  favorites INTEGER REFERENCES products(id)
);