export const getProductData = (req) => {
  return {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    fulltext: req.body.fullText,
    weight: req.body.weight,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    nutrients: {
      calories: req.body?.["nutrients.calories"],
      carbohydrates: req.body?.["nutrients.carbohydrates"],
      protein: req.body?.["nutrients.protein"],
      fats: req.body?.["nutrients.fats"],
    },
    isVegan: req.body.isVegan,
    cookTime: req.body.cookTime,
    isNewProduct: req.body.isNewProduct,
    compound: req.body.compound,
  };
};
