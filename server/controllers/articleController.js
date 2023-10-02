import articleModel from "../models/articleModel.js";
import * as factory from "./handleFactory.js";

export const getArticles = factory.getAll(articleModel, { path: "comments" });
export const addArticle = factory.addOne(articleModel);
export const getArticle = factory.getOne(articleModel, { path: "comments" });
export const updateArticle = factory.updateOne(articleModel);
export const deleteArticle = factory.deleteOne(articleModel);
