import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getAll = (Model, populateObject) =>
  catchAsync(async (req, res, next) => {
    let queryObj = { ...req.query };

    //deleting unnecesarry words from query string
    const exludedValues = ["sort", "select", "page", "limit"];
    exludedValues.forEach((el) => delete queryObj[el]);

    //enable range filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Model.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      let sortStr = req.query.sort;
      sortStr = sortStr.replace(",", " ");
      query.sort(sortStr);
    }

    //selecting fields
    if (req.query.select) {
      let selectStr = req.query.select;
      selectStr = selectStr.replace(",", " ");
      query.select(selectStr);
    } else {
    }

    //pagination
    if (req.query.page) {
      const page = req.query.page;
      const limit = req.query.limit || 3;

      if (page < 1) return next(new AppError("Invalid page provided!", 404));
      if (limit < 1) return next(new AppError("Invalid limiting!", 400));

      query.skip((page - 1) * limit).limit(limit);
    }

    //executing query
    query.populate(populateObject);
    if (req.params.productID) query.find({ productID: req.params.productID });
    const data = await Model.find(query);

    if (!data || data.length === 0) {
      return next(
        new AppError("There aren't documents with current filters!", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  });

export const getOne = (Model, populateObject) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate(populateObject);

    if (!doc)
      return next(new AppError("There aren't documents with this id!", 404));

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const addOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(new AppError("There aren't documents with this id!", 404));

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new AppError("There aren't documents with this id!", 404));

    res.status(204).json({
      status: "success",
      data: [],
    });
  });
