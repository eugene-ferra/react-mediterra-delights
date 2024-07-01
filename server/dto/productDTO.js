export default class ProductDTO {
  constructor(responseProduct) {
    this.id = responseProduct._id;
    this.title = responseProduct.title;
    this.slug = responseProduct.slug;
    this.category = responseProduct.category;
    this.description = responseProduct.description;
    this.fullText = responseProduct.fullText || null;
    this.avgRating = responseProduct.avgRating || 0;
    this.reviewCount = responseProduct.reviewCount || 0;
    this.imgCover = {
      jpg: responseProduct.imgCover.jpg,
      webp: responseProduct.imgCover.webp,
      avif: responseProduct.imgCover.avif,
    };
    this.images = responseProduct.images
      ? responseProduct.images.map((item) => ({
          jpg: item.jpg,
          webp: item.webp,
          avif: item.avif,
        }))
      : [];
    this.weight = responseProduct.weight;
    this.price = responseProduct.price;
    this.discountPrice = responseProduct.discountPrice || null;
    this.nutrients = {
      calories: responseProduct.nutrients.calories || null,
      carbohydrates: responseProduct.nutrients.carbohydrates || null,
      protein: responseProduct.nutrients.protein || null,
      fats: responseProduct.nutrients.fats || null,
    };
    this.cookTime = responseProduct.cookTime;
    this.isNewProduct = responseProduct.isNewProduct || null;
    this.isVegan = responseProduct.isVegan;
  }
}
