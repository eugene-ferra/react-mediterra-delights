import ProductService from "../services/productService.js";
import getProductData from "../utils/getProductData.js";
import getQueryData from "../utils/getQueryData.js";
import FileService from "../services/fileService.js";
import sendResponse from "../utils/sendResponse.js";

export const getProducts = async (req, res, next) => {
  try {
    const productService = new ProductService();
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    const data = await productService.getAll({ filterObj, sortObj, page, limit });
    const pages = await productService.countDocuments(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (err) {
    next(err);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const productService = new ProductService();

    const data = await productService.getOne(req.params.id);

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const productService = new ProductService();

    const textData = getProductData(req);
    const imgCover = req?.files?.imgCover?.[0]?.buffer;
    const images = req.files?.images?.map((item) => item?.buffer);

    const data = await productService.addOne(textData, imgCover, images);

    sendResponse({ res, statusCode: 201, data });
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (req, res, next) => {
  const fileService = new FileService();
  const productService = new ProductService();
  let savedCover;
  let savedImages;

  try {
    const data = getProductData(req);
    const newImgCover = req?.files?.imgCover?.[0]?.buffer || null;
    const newImages = req.files?.images?.map((item) => item?.buffer) || null;
    const { id } = req.params;

    const doc = await productService.updateOne({ id, data, newImgCover, newImages });

    sendResponse({ res, statusCode: 200, data: { doc } });
  } catch (err) {
    if (savedCover) await fileService.deleteFiles(savedCover);
    if (savedImages?.length) await fileService.deleteFiles(savedImages);
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const productService = new ProductService();
    const { id } = req.params;

    await productService.deleteOne(id);

    sendResponse({ res, statusCode: 204 });
  } catch (err) {
    next(err);
  }
};
export const getOptions = (req, res, next) => {
  try {
    const productService = new ProductService();

    const data = productService.getOptions();

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
