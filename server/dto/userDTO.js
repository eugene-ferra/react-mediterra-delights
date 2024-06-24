export default class UserDTO {
  constructor(userResponse) {
    this.id = userResponse._id;
    this.name = userResponse.name;
    this.lastName = userResponse.lastName;
    this.phone = userResponse?.phone;
    this.email = userResponse.email;
    this.role = userResponse.role;
    this.password = userResponse.password;
    this.avatar = {
      jpg: userResponse.avatar?.jpg,
      webp: userResponse.avatar?.webp,
      avif: userResponse.avatar?.avif,
    };
    this.savedProducts = userResponse.savedProducts || [];
    this.likedArticles = userResponse.likedArticles || [];
    this.savedArticles = userResponse.savedArticles || [];
    this.addedReviews = userResponse.addedReviews || [];
    this.addedComments = userResponse.addedComments || [];
    this.orders = userResponse.orders || [];
    this.cart = userResponse?.cart
      ? userResponse.cart.map((item) => ({ id: item.id, quantity: item.quantity }))
      : [];
  }
}
