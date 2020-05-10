/**
 *
 * @param {Number} max
 */
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

/**
 * @param {Array} collection
 */
function getRandomItemFromCollection(collection) {
  const max = collection.length;
  const index = getRandomNumber(max) - 1;

  return collection[index];
}

module.exports = {
  getRandomNumber,
  getRandomItemFromCollection,
};
