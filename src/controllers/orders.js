const paginate = require('../lib/paginate');
const orders = require('../data/orders');
const categories = require('../data/categories');

function getOrderParams(req) {
  const { name, category, subcategory, object, quantity, reimbursable } = req.body;

  return { name, category, subcategory, object, quantity, reimbursable };
}

function validateOrder(order, allDefined = true) {
  let validObj = {
    name: typeof order.name === 'string',
    category: Object.keys(categories).includes(order.category),
    subcategory: (categories[order.category] || []).includes(order.subcategory),
    object: typeof order.object === 'string',
    quantity: Number.isInteger(order.quantity) && order.quantity > 0,
    reimbursable: [true, false].includes(order.reimbursable),
  };
  if (!allDefined) {
    for (key in validObj) {
      if (order[key] === undefined) delete validObj[key];
    }
  }
  const allValid = Object.values(validObj).every((v) => v);

  return { validObj, allValid };
}

function getOrder(req, res) {
  const order = orders[req.params.id];

  if (order) {
    res.json({ order });
  } else {
    res.sendStatus(404);
  }
}

function addOrder(req, res) {
  const params = getOrderParams(req);

  const { validObj, allValid } = validateOrder(params);

  if (allValid) {
    const newOrder = {
      id: orders.length,
      ...params,
    };
    orders.push(newOrder);

    res.json(newOrder);
  } else {
    res.status(400).send({ validObj });
  }
}

function editOrder(req, res) {
  const { id } = req.params;
  const params = getOrderParams(req);

  const { validObj, allValid } = validateOrder(params, false);

  if (allValid) {
    orders[id] = { ...orders[id], ...params };

    res.json(orders[id]);
  } else {
    res.status(400).send({ validObj });
  }
}

function getOrders(req, res) {
  const { page } = req.query;

  const itemsPerPage = 10;

  res.json({
    orders: paginate(orders, itemsPerPage, Number(page || 1)),
    totalPageCount: Math.ceil(orders.length / itemsPerPage),
    totalOrdersCount: orders.length,
  });
}

module.exports = { getOrder, getOrders, addOrder, editOrder };
