const InvalidOrderException = require('../errors/InvalidOrderException');
const menu = require('../data/menu');

/**
 * Validates cart/order items — Sheet 04 (Dr. Sheena Christabel Pravin, VIT Chennai)
 * Throws InvalidOrderException with structured reason codes.
 */
function validateOrder(order) {
  const items = (order && order.items) || [];

  if (!Array.isArray(items) || items.length === 0) {
    throw new InvalidOrderException('Cart is empty. Please add at least one item.', 'EMPTY_CART');
  }

  for (const line of items) {
    const menuItem = menu.find((m) => m.id === Number(line.id));
    if (!menuItem) {
      throw new InvalidOrderException(`Unknown menu item #${line.id}`, 'UNKNOWN_ITEM');
    }
    if (!line.qty || line.qty <= 0 || !Number.isInteger(line.qty)) {
      throw new InvalidOrderException(`Invalid quantity for ${menuItem.name}`, 'BAD_QTY');
    }
  }

  return true;
}

module.exports = validateOrder;
