import { query } from "express";
import productModel from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getProducts = catchAsync(async (req, res, next) => {
  let queryObj = { ...req.query };

  //deleting unnecesarry words from query string
  const exludedValues = ["sort", "select", "page", "limit"];
  exludedValues.forEach((el) => delete queryObj[el]);

  //enable range filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = productModel.find(JSON.parse(queryStr));

  //sorting
  if (req.query.sort) {
    let sortStr = req.query.sort;
    sortStr = sortStr.replace(",", " ");
    query.sort(sortStr);
  } else {
    query.sort("title");
  }

  //selecting fields
  if (req.query.select) {
    let selectStr = req.query.select;
    selectStr = selectStr.replace(",", " ");
    query.select(selectStr);
  }

  if (req.query.page) {
    const page = req.query.page;
    const limit = req.query.limit || 3;
    console.log(page, limit);

    if (page < 1) return next(new AppError("Invalid page provided!", 404));
    if (limit < 1) return next(new AppError("Invalid limiting!", 400));

    query.skip((page - 1) * limit).limit(limit);
  }

  //executing query
  const data = await productModel.find(query);

  if (!data || data.length === 0)
    return next(
      new AppError("There aren't documents with current filters!", 404)
    );

  res.status(200).json({
    status: "success",
    data: data,
  });
});

export const addProduct = catchAsync(async (req, res, next) => {
  const doc = await productModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const doc = await productModel.findById(req.params.id);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const doc = await productModel.findByIdAndUpdate(req.params.id, req.body);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const doc = await productModel.findByIdAndDelete(req.params.id);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));
  res.status(204).json({
    status: "success",
    data: [],
  });
});
