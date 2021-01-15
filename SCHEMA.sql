CREATE DATABASE IF NOT EXISTS fec;

USE fec;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64),
  description VARCHAR(120),
  imageUrl VARCHAR(120),
  category INT,
  isFavorite INT,
  price VARCHAR(12),
  cutPrice VARCHAR(12),
  rating VARCHAR(12),
  reviewCount INT
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64)
);