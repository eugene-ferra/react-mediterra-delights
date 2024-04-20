import AppError from "./appError.js";

export const getQueryData = (req) => {
  if (req.query.page && req.query.page < 1) {
    throw new AppError("Invalid page provided!", 400);
  }
  if (req.query.limit && req.query.limit < 1) {
    throw new AppError("Invalid limit provided!", 400);
  }
  const { page, limit, sort, ...filters } = req.query;

  const filterKeys = ["sort", "select", "page", "limit"];

  const queryObj = Object.keys(filters).reduce((acc, key) => {
    if (!filterKeys.includes(key)) {
      acc[key] = filters[key];
    }
    return acc;
  }, {});

  const queryStr = JSON.stringify(queryObj).replace(
    /\b(gte|gt|lte|lt|regex|in)\b/g,
    (match) => `$${match}`
  );

  console.log(JSON.parse(queryStr));

  return {
    filterObj: JSON.parse(queryStr),
    sortObj: req.query.sort?.replace(/,/g, " "),
    page: page,
    limit: limit,
  };
};
