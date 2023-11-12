import { ReviewDTO } from "./reviewDTO.js";

export class ProductDTO {
  id;
  title;
  category;
  description;
  fullText;
  avgRating;
  reviewCount;
  imgCover;
  images;
  weight;
  price;
  discountPrice;
  nutrients;
  isVegan;
  cookTime;
  isNewProduct;
  compound;
  reviews;

  constructor(responseProduct) {
    this.id = responseProduct._id;
    this.title = responseProduct.title;
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
      ? responseProduct.images.map((item) => {
          return {
            jpg: item.jpg || null,
            webp: item.webp || null,
            avif: item.avif || null,
          };
        })
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
    this.reviews = responseProduct.reviews
      ? responseProduct.reviews.map((item) => new ReviewDTO(item))
      : [];
    this.cookTime = responseProduct.cookTime;
    this.isNewProduct = responseProduct.isNewProduct || null;
    this.compound = responseProduct.compound
      ? responseProduct.compound.map((item) => item)
      : [];
    this.isVegan = responseProduct.isVegan;
  }
}
