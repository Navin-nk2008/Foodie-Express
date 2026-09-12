const searchService = require('../services/search.service');

function search(req, res) {
  const { q, dietary, minRating, maxDeliveryTime, hasOffers } = req.query;
  const results = searchService.search({
    q,
    dietary,
    minRating,
    maxDeliveryTime,
    hasOffers,
  });
  res.status(200).json(results);
}

module.exports = {
  search,
};
