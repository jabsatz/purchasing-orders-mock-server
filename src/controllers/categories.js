const categories = require('../data/categories');

function getCategories(req, res) {
  res.json({ categories: Object.keys(categories) });
}

function getSubCategories(req, res) {
  const { category } = req.params;

  res.json({ subcategories: categories[category] });
}

module.exports = { getCategories, getSubCategories };
