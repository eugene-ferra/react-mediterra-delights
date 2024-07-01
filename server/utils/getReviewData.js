const getReviewData = (req) => ({
  productID: req.body.productID,
  userID: req.body.userID,
  review: req.body.review,
  rating: req.body.rating,
});

export default getReviewData;
