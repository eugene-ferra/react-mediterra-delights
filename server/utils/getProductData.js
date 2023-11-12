export const getProductData = (req) => {
  return {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    fulltext: req.body.fulltext,
    imgCover: req.body.imgCover,
    images: req.body.images,
    weight: req.body.weight,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    nutrients: req.body.nutrients,
    isVegan: req.body.isVegan,
    cookTime: req.body.cookTime,
    isNewProduct: req.body.isNewProduct,
    compound: req.body.compound,
  };
};
