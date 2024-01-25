import { UserDTO } from "./userDTO.js";

export class ReviewDTO {
  id;
  productID;
  userID;
  createdAt;
  review;
  rating;
  isModerated;

  constructor(responseReview) {
    this.id = responseReview._id;
    this.productID = responseReview.productID;
    this.userID = responseReview.userID ? new UserDTO(responseReview?.userID) : null;
    this.createdAt = responseReview.createdAt;
    this.review = responseReview.review || null;
    this.rating = responseReview.rating;
    this.isModerated = responseReview.isModerated;
  }
}
