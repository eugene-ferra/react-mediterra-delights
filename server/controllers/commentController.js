import commentModel from "../models/commentModel.js";
import * as factory from "./handleFactory.js";

export const setArticlesIds = (req, res, next) => {
  if (!req.body.articleID) req.body.articleID = req.params.articleID;
  if (!req.body.userID) req.body.userID = req.user._id;
  next();
};

export const addComment = factory.addOne(commentModel);
export const getAllComments = factory.getAll(commentModel);
export const getComment = factory.getOne(commentModel);
export const updateComment = factory.updateOne(commentModel);
export const deleteComment = factory.deleteOne(commentModel);
