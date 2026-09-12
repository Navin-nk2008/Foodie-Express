const validateOrder = require('../services/validateOrder');
const InvalidOrderException = require('../errors/InvalidOrderException');
const { createOrder, getOrder, getAllOrders } = require('../services/orderProcessor');

function placeOrder(req, res) {
  // try / catch / finally — Sheet 04 (Dr. Sheena Christabel Pravin, VIT Chennai)
  try {
    validateOrder(req.body);
    const userId = req.headers['x-user-id'] || 'user-1';
    const record = createOrder(req.body, userId);
    res.status(201).json({ order: record });
  } catch (e) {
    if (e instanceof InvalidOrderException) {
      return res.status(400).json({ error: e.message, reasonCode: e.reasonCode });
    }
    throw e;
  } finally {
    console.log(`[foodie] order attempt processed at ${new Date().toISOString()}`);
  }
}

function getOrderById(req, res) {
  const { id } = req.params;
  const record = getOrder(id);
  if (!record) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.status(200).json({ order: record });
}

function listOrders(req, res) {
  const userId = req.headers['x-user-id'] || 'user-1';
  const records = getAllOrders(userId);
  res.status(200).json({ orders: records });
}

function getTracking(req, res) {
  const { id } = req.params;
  const record = getOrder(id);
  if (!record) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.status(200).json({
    orderId: record.id,
    orderNumber: record.orderNumber,
    stage: record.stage,
    history: record.history,
    eta: record.eta,
    estimatedArrival: record.estimatedArrival,
    rider: record.rider,
    deliveryAddress: record.deliveryAddress,
    items: record.items,
    total: record.total,
  });
}

module.exports = {
  placeOrder,
  getOrderById,
  listOrders,
  getTracking,
};
