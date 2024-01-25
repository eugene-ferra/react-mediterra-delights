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
  orders;
  cart;

  constructor(userResponse) {
    this.id = userResponse?._id || null;
    this.name = userResponse.name || "test";
    this.lastName = userResponse.lastName || "testsss";
    this.phone = userResponse?.phone || null;
    this.email = userResponse.email || "test";
    this.role = userResponse.role || "test";
    this.password = userResponse.password || "test";
    this.avatar = {
      jpg: userResponse.avatar?.jpg || null,
      webp: userResponse.avatar?.webp || null,
      avif: userResponse.avatar?.avif || null,
    };
    this.savedProducts = userResponse.savedProducts || [];
    this.likedArticles = userResponse.likedArticles || [];
    this.savedArticles = userResponse.savedArticles || [];
    this.addedReviews = userResponse.addedReviews || [];
    this.addedComments = userResponse.addedComments || [];
    this.orders = userResponse.orders || [];
    this.cart = userResponse?.cart
      ? userResponse.cart.map((item) => {
          return { id: item.id, quantity: item.quantity };
        })
      : [];
  }
}
