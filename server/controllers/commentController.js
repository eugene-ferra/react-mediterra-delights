import { commentService } from "../services/commentService.js";
import { getQueryData } from "../utils/getQueryData.js";
import { validationResult } from "express-validator";

export const addComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const newComment = {
      articleID: req.body.articleID,
      userID: req.body.userID,
      comment: req.body.comment,
    };

    const data = await commentService.addOne(newComment);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    let { filterObj, sortObj, page, limit } = getQueryData(req);
    if (req.params.articleID) {
      filterObj = { ...filterObj, articleID: req.params.articleID, isModerated: true };
    }

    const data = await commentService.getAll({ filterObj, sortObj, page, limit });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const data = await commentService.getOne({ id: req.params.id });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    const updatedDoc = { comment: req.body.comment, isModerated: req.body.isModerated };

    const data = await commentService.updateOne(
      req.params.id,
      updatedDoc,
      req.user.role
    );
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(err);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteOne(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(err);
  }
};
