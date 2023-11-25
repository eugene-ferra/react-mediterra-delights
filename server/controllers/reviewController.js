import { reviewService } from "../services/reviewService.js";
import { getQueryData } from "../utils/getQueryData.js";
import { validationResult } from "express-validator";

export const addReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const newReview = {
      productID: req.body.productID,
      userID: req.body.userID,
      review: req.body.review,
      rating: req.body.rating,
    };

    const data = await reviewService.addOne(newReview);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);
    if (req.params.productID) {
      filterObj = { ...filterObj, productID: req.params.productID, isModerated: true };
    }
    const data = await reviewService.getAll({ filterObj, sortObj, page, limit });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch {
    next();
  }
};

export const getReview = async (req, res, next) => {
  try {
    const data = await reviewService.getOne({ id: req.params.id });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    let updateReview = {
      review: req.body.review,
      rating: req.body.rating,
      isModerated: req.body.rating,
    };

    const data = await reviewService.updateOne(
      req.params.id,
      updateReview,
      req.user.role
    );

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteOne(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
