import reviewModel from "../models/reviewModel.js";
import catchAsync from "../utils/catchAsync.js";

export const setReviewsIds = (req, res, next) => {
  if (!req.body.productID) req.body.productID = req.params.id;
  //FIXME: TEMPORARY!!! MUST BE REAL USER ID FROM DB
  if (!req.body.userID) req.body.userID = "650ae6b6cb7174a9a959fe51";
  next();
};

export const addReview = catchAsync(async (req, res, next) => {
  const doc = await reviewModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const getAllReviews = catchAsync(async (req, res, next) => {
  let queryObj = { ...req.query };

  //deleting unnecesarry words from query string
  const exludedValues = ["sort", "select", "page", "limit"];
  exludedValues.forEach((el) => delete queryObj[el]);

  //enable range filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const query = reviewModel.find(JSON.parse(queryStr));

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

  const data = await reviewModel.find(query);

  if (!data || data.length === 0)
    return next(
      new AppError("There aren't documents with current filters!", 404)
    );

  res.status(200).json({
    status: "success",
    data: data,
  });
});

export const getReview = catchAsync(async (req, res, next) => {
  const doc = await reviewModel.findById(req.params.id);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));
  res.status(201).json({
    status: "success",
    data: doc,
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const doc = await reviewModel.findByIdAndUpdate(req.params.id, req.body);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));

  res.status(200).json({
    status: "success",
    data: doc,
  });
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const doc = await reviewModel.findByIdAndDelete(req.params.id);
  if (!doc)
    return next(new AppError("There aren't documents with this id!", 404));
  res.status(204).json({
    status: "success",
    data: [],
  });
});
