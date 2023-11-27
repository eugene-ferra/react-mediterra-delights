export class UserDTO {
  id;
  name;
  lastName;
  email;
  phone;
  role;
  password;
  avatar;
  savedProducts;
  likedArticles;
  savedArticles;
  addedReviews;
  addedComments;
  cart;

  constructor(userResponse) {
    this.id = userResponse._id;
    this.name = userResponse.name;
    this.lastName = userResponse.lastName;
    this.phone = userResponse?.phone || null;
    this.email = userResponse.email;
    this.role = userResponse.role;
    this.password = userResponse.password;
    this.avatar = {
      jpg: userResponse.avatar.jpg || null,
      webp: userResponse.avatar.webp || null,
      avif: userResponse.avatar.avif || null,
    };
    this.savedProducts = userResponse.savedProducts || [];
    this.likedArticles = userResponse.likedArticles || [];
    this.savedArticles = userResponse.savedArticles || [];
    this.addedReviews = userResponse.addedReviews || [];
    this.addedComments = userResponse.addedComments || [];
    this.cart = userResponse?.cart
      ? userResponse.cart.map((item) => {
          return { id: item.id, quantity: item.quantity };
        })
      : [];
  }
}
