import UserService from "../services/userService.js";
import getQueryData from "../utils/getQueryData.js";
import sendResponse from "../utils/sendResponse.js";
import ProductService from "../services/productService.js";
import OrderService from "../services/orderService.js";
import ArticleService from "../services/articleService.js";

export const getUsers = async (req, res, next) => {
  try {
    const userService = new UserService();

    const { filterObj, sortObj, page, limit } = getQueryData(req);
    const data = await userService.getAll({ filterObj, sortObj, page, limit });
    const pages = await userService.countDocuments(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userService = new UserService();

    const data = await userService.getOne(req.user._id);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const getSavedArticles = async (req, res, next) => {
  try {
    const userService = new UserService();
    const articleService = new ArticleService();
    const { page, limit } = getQueryData(req);
    const userId = req.user._id;

    const user = await userService.getOne(userId);
    const filterObj = { _id: { $in: user.savedArticles } };

    const data = await articleService.getAll({ filterObj, page, limit });
    const pages = await articleService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (error) {
    next(error);
  }
};

export const getSavedProducts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, limit } = getQueryData(req);

    const productService = new ProductService();
    const userService = new UserService();

    const user = await userService.getOne(userId);
    const filterObj = { _id: { $in: user.savedProducts } };

    const data = await productService.getAll({ filterObj, page, limit });
    const pages = await productService.countDocuments(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (error) {
    next(error);
  }
};

export const getOrderHistory = async (req, res, next) => {
  try {
    const userService = new UserService();
    const orderService = new OrderService();
    const { page, limit } = getQueryData(req);
    const userId = req.user._id;

    const user = await userService.getOne(userId);
    const filterObj = { _id: { $in: user.orders } };

    const data = await orderService.getAll({ filterObj, sortObj: "-time", page, limit });
    const pages = await orderService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (error) {
    next(error);
  }
};

export const saveProduct = async (req, res, next) => {
  try {
    const userService = new UserService();
    const productService = new ProductService();

    const userId = req.user._id;
    const productId = req.body.id;

    await productService.getOne(req.body.id);
    const data = await userService.addToArray(userId, "savedProducts", productId);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};
export const discardProduct = async (req, res, next) => {
  try {
    const userService = new UserService();
    const userId = req.user._id;
    const productId = req.params.id;
    const data = await userService.deleteFromArray(userId, "savedProducts", productId);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const likeArticle = async (req, res, next) => {
  try {
    const userService = new UserService();
    const articleService = new ArticleService();
    const userId = req.user._id;
    const articleId = req.body.id;

    await articleService.getOne(articleId);
    const data = await userService.addToArray(userId, "likedArticles", articleId);

    await articleService.updateOne(articleId, { $inc: { likes: 1 } });

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};
export const unlikeArticle = async (req, res, next) => {
  try {
    const userService = new UserService();
    const articleService = new ArticleService();
    const userId = req.user._id;
    const articleId = req.params.id;

    await articleService.getOne(articleId);

    const data = await userService.deleteFromArray(userId, "likedArticles", articleId);
    await articleService.updateOne(articleId, { $inc: { likes: -1 } });

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const saveArticle = async (req, res, next) => {
  try {
    const userService = new UserService();
    const articleService = new ArticleService();
    const userId = req.user._id;
    const articleId = req.body.id;

    await articleService.getOne(articleId);
    const data = await userService.addToArray(userId, "savedArticles", articleId);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};
export const discardArticle = async (req, res, next) => {
  try {
    const userService = new UserService();
    const userId = req.user._id;
    const articleId = req.params.id;

    const data = await userService.deleteFromArray(userId, "savedArticles", articleId);

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userService = new UserService();
    const productService = new ProductService();
    const { id, quantity } = req.body;
    const userId = req.user._id;

    await productService.getOne(id);
    const data = await userService.addToCart(userId, id, quantity);

    sendResponse({ res, statusCode: 201, data });
  } catch (error) {
    next(error);
  }
};

export const deleteFromCart = async (req, res, next) => {
  try {
    const userService = new UserService();

    const data = await userService.deleteFromCart(req.user._id, req.params.id);
    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const userService = new UserService();
    const userId = req.user._id;
    const productId = req.params.id;
    const { quantity } = req.body;

    const data = await userService.updateCart(userId, productId, quantity);
    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userService = new UserService();

    const user = await userService.clearCart(req.user._id);
    sendResponse({ res, statusCode: 204, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  try {
    const userService = new UserService();

    const userInfo = {
      name: req.body?.name,
      lastName: req.body?.lastName,
      phone: req.body?.phone,
      oldPassword: req.body?.oldPassword,
      password: req.body?.password,
    };
    const userId = req.user._id;
    const avatar = req?.file?.buffer;

    const data = await userService.updateOne(userId, userInfo, avatar);

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userService = new UserService();

    await userService.deleteOne(req.user._id);
    sendResponse({ res, statusCode: 204 });
  } catch (err) {
    next(err);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const userService = new UserService();

    const data = await userService.updateOne(req.params.id, { role: req.body.role });

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
