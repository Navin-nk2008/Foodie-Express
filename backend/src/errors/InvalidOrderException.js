/**
 * Custom Exception — Sheet 04 (Dr. Sheena Christabel Pravin, VIT Chennai)
 * Extends Error to provide structured reason codes for invalid orders.
 */
class InvalidOrderException extends Error {
  constructor(message, reasonCode = 'INVALID_ORDER') {
    super(message);
    this.name = 'InvalidOrderException';
    this.reasonCode = reasonCode;
  }
}

module.exports = InvalidOrderException;
