import AppError from "./appError.js";

const getQueryData = (req) => {
  const { page, limit, ...filters } = req.query;

  if (page && page < 1) {
    throw new AppError("Invalid page provided!", 400);
  }
  if (limit && limit < 1) {
    throw new AppError("Invalid limit provided!", 400);
  }

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

  const filter = JSON.parse(queryStr);

  Object.keys(filter).forEach((key) => {
    if (Object.keys(filter[key]).includes("$regex")) {
      filter[key].$options = "i";
    }
  });

  return {
    filterObj: filter,
    sortObj: req.query.sort?.replace(/,/g, " "),
    page: page,
    limit: limit,
  };
};

export default getQueryData;
