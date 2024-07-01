import getArticleData from "../utils/getArticleData.js";
import getQueryData from "../utils/getQueryData.js";
import FileService from "../services/fileService.js";
import ArticleService from "../services/articleService.js";
import sendResponse from "../utils/sendResponse.js";

export const handleImages = async (req, res, next) => {
  try {
    const FS = new FileService();
    const fileName = await FS.saveOneFormatImage(
      req.file.buffer,
      "articles",
      req.body?.name || "article"
    );

    const port = process.env.PORT || 3000;
    const protocol = process.env.PROTOCOL || "http";
    const hostname = process.env.HOSTNAME || "localhost";

    const linkBegin = `${protocol}://${hostname}:${port}`;
    const location = `${linkBegin}/${fileName}`;

    sendResponse({ res, statusCode: 200, data: { location } });
  } catch (err) {
    next(err);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const articleService = new ArticleService();
    const { filterObj, sortObj, page, limit } = getQueryData(req);
    const data = await articleService.getAll({ filterObj, sortObj, page, limit });
    const pages = await articleService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (err) {
    next(err);
  }
};
export const addArticle = async (req, res, next) => {
  try {
    const articleService = new ArticleService();
    const newArticleData = getArticleData(req);
    const imgCover = req?.files?.imgCover?.[0]?.buffer;

    const data = await articleService.addOne(newArticleData, imgCover);

    sendResponse({ res, statusCode: 201, data });
  } catch (err) {
    next(err);
  }
};
export const getArticle = async (req, res, next) => {
  try {
    const articleService = new ArticleService();
    const { id } = req.params;
    const { ip } = req;
    const { userAgent } = req.headers;

    const data = await articleService.getAndAddViews({ id, ip, userAgent });

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
export const updateArticle = async (req, res, next) => {
  try {
    const articleService = new ArticleService();

    const { id } = req.params;
    const updatedObj = getArticleData(req);
    const imgCover = req?.files?.imgCover?.[0]?.buffer;

    const data = await articleService.updateOne(id, updatedObj, imgCover);

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
export const deleteArticle = async (req, res, next) => {
  try {
    const articleService = new ArticleService();

    await articleService.deleteOne(req.params.id);
    sendResponse({ res, statusCode: 204 });
  } catch (err) {
    next(err);
  }
};
export const getOptions = (req, res, next) => {
  try {
    const articleService = new ArticleService();
    const data = articleService.getOptions();

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
