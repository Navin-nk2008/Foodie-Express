const InvalidOrderException = require('../errors/InvalidOrderException');

function errorHandler(err, req, res, next) {
  console.error('[Error Middleware]:', err);

  if (err instanceof InvalidOrderException) {
    return res.status(400).json({
      error: err.message,
      reasonCode: err.reasonCode,
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal server error',
  });
}

module.exports = errorHandler;
