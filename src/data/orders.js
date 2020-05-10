const Random = require('../lib/random');

const categories = require('./categories');

const orders = [];

const names = [
  'Carlos López',
  'Juan Rodríguez',
  'Daniela Fernández',
  'Miguel Díaz',
  'Camila Justo',
  'Valeria Gómez',
];

for (var i = 0; i < 5; i++) {
  const name = Random.getRandomItemFromCollection(names);

  const category = Random.getRandomItemFromCollection(Object.keys(categories));
  const subcategory = Random.getRandomItemFromCollection(categories[category]);
  const object = `Alguna cosa de ${subcategory}`;
  const quantity = Random.getRandomNumber(30);
  const reimbursable = Random.getRandomItemFromCollection([true, false]);

  orders.push({
    id: i,
    name,
    category,
    subcategory,
    object,
    quantity,
    reimbursable,
  });
}

module.exports = orders;
