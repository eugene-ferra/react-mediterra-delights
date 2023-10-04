import articleModel from "../models/articleModel.js";
import * as factory from "./handleFactory.js";
import catchAsync from "../utils/catchAsync.js";

export const getArticles = factory.getAll(articleModel, { path: "comments" });
// export const addArticle = factory.addOne(articleModel);

export const getArticle = catchAsync(async (req, res, next) => {
  const doc = await articleModel
    .findById(req.params.id)
    .populate({ path: "comments" })
    .select("+viewsArr")
    .lean();

  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));

  const viewsIps = doc.viewsArr.map((item) => item.ip);
  const viewsUserAgents = doc.viewsArr.map((item) => item.userAgent);

  if (
    !(
      viewsIps.includes(req.ip) &&
      viewsUserAgents.includes(req.headers["user-agent"])
    )
  ) {
    articleModel.addView(req.params.id, req.ip, req.headers["user-agent"]);
  }

  const viewsArrData = doc;
  delete viewsArrData.viewsArr;

  res.status(201).json({
    status: "success",
    data: viewsArrData,
  });
});

export const updateArticle = factory.updateOne(articleModel);
export const deleteArticle = factory.deleteOne(articleModel);

export const setViews = (req, res, next) => {
  if (req.method === "GET") {
    req.body.viewsArr = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    };
  }
  next();
};
