export default class ReviewDTO {
  constructor(responseReview) {
    this.id = responseReview._id;
    this.productID = responseReview.productID;
    this.user = {
      id: responseReview.userID._id,
      name: responseReview.userID.name,
      lastName: responseReview.userID.lastName,
      avatar: {
        jpg: responseReview.userID.avatar?.jpg,
        webp: responseReview.userID.avatar?.webp,
        avif: responseReview.userID.avatar?.avif,
      },
    };
    this.createdAt = responseReview.createdAt;
    this.review = responseReview.review || null;
    this.rating = responseReview.rating;
    this.isModerated = responseReview.isModerated;
  }
}
