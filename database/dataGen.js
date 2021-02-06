const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').argv;

const lines = argv.lines || 50000;
const filename = argv.output || 'prods.csv';
const stream = fs.createWriteStream(filename);


const createProd = () => {
  let name = faker.commerce.productName();
  let description = faker.lorem.sentences(1);
  let imageUrl = faker.image.image();
  let category = faker.random.number(15);
  let isFavorite = faker.random.boolean();
  let price = faker.commerce.price();
  let cutPrice = faker.commerce.price(0, 15);
  let rating = faker.random.number({min: 0, max: 5});
  let reviewCount = faker.random.number(100);

  return `${name}, ${description}, ${imageUrl}, ${category}, ${isFavorite}, ${price}, ${cutPrice}, ${rating}, ${reviewCount}\n`;
};

// const createCat = () => {
//   let name = faker.commerce.department();
//   return `${name}\n`;
// };

// const createUsers = () => {
//   let numOfFavs = Math.floor(Math.random() * 5);
//   let favorites = faker.
// }

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  const writing = function writing() {
    let canWrite = true;
    do {
      i--;
      let prod = createProd();
      if (i === 0) {
        writeStream.write(prod, encoding, done);
      } else {
        writeStream.write(prod, encoding);
      }

    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  };
  writing();
};

stream.write('name,description,imageUrl,category,isFavorite,price,cutPrice,rating,reviewCount\n', 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
});