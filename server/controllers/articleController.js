import { articleService } from "../services/articleService.js";
import { getArticleData } from "../utils/getArticleData.js";
import { getQueryData } from "../utils/getQueryData.js";
import addLinks from "../utils/addLinks.js";
import addLinksToMarkup from "../utils/addLinksToMarkup.js";
import { validationResult } from "express-validator";

export const getArticles = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    let data = await articleService.getAll({
      filterObj,
      sortObj,
      page,
      limit,
      populateObj: {
        path: "comments",
        match: { isModerated: true },
        populate: { path: "userID", model: "User" },
      },
    });

    data[1].map((doc) => addLinks(req, doc, ["imgCover"]));
    data[1].map((doc) =>
      doc.comments.map((item) => addLinks(req, item.userID, ["avatar"]))
    );

    data[1].map((doc) => addLinksToMarkup(req, doc, "markup"));

    res.status(200).json({ status: "success", data });
  } catch (err) {
    next(err);
  }
};
export const addArticle = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !req?.files?.imgCover?.[0]?.buffer) {
      return res.status(400).json({
        status: "fail",
        errors: req?.files?.imgCover?.[0]?.buffer
          ? errors.array()
          : [...errors.array(), { path: "imgCover", msg: "imgCover is required" }],
      });
    }

    const newArticleData = getArticleData(req);

    let data = await articleService.addOne(
      newArticleData,
      req?.files?.imgCover?.[0]?.buffer
    );
    data = addLinks(req, data[0], ["imgCover"]);
    data = addLinksToMarkup(req, data, "markup");

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const getArticle = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    let data = await articleService.getOne({
      id: req.params.id,
      populateObj: { path: "comments", match: { isModerated: true } },
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    data = addLinks(req, data[0], ["imgCover"]);
    data = addLinksToMarkup(req, data, "markup");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const updateArticle = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const updatedObj = getArticleData(req);

    let data = await articleService.updateOne(
      req.params.id,
      updatedObj,
      req?.files?.imgCover?.[0]?.buffer,
      req.protocol,
      req.hostname
    );

    data = addLinks(req, data[0], ["imgCover"]);
    data = addLinksToMarkup(req, data, "markup");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteArticle = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    await articleService.deleteOne(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
export const getOptions = (req, res, next) => {
  try {
    const data = articleService.getOptions();

    res.status(200).json({
      status: "succes",
      data,
    });
  } catch (err) {
    next(err);
  }
};
