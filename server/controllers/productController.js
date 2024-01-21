import { productService } from "../services/productService.js";
import addLinks from "../utils/addLinks.js";
import { getProductData } from "../utils/getProductData.js";
import { getQueryData } from "../utils/getQueryData.js";
import { validationResult } from "express-validator";

export const getProducts = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    let data = await productService.getAll({
      filterObj,
      sortObj,
      page,
      limit,
      populateObj: {
        path: "reviews",
        match: { isModerated: true },
        populate: { path: "userID", model: "User" },
      },
    });

    console.log(data.reviews);

    data[1].map((doc) => addLinks(req, doc, ["imgCover", "images"]));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    let data = await productService.getOne({
      id: req.params.id,
      populateObj: {
        path: "reviews",
        match: { isModerated: true },
      },
    });

    data = addLinks(req, data[0], ["imgCover", "images"]);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty() || !req?.files?.imgCover?.[0]?.buffer) {
      return res.status(400).json({
        status: "fail",
        errors: req?.files?.imgCover?.[0]?.buffer
          ? errors.array()
          : [...errors.array(), { path: "imgCover", msg: "imgCover is required" }],
      });
    }

    let textData = getProductData(req);

    let data = await productService.addOne(
      textData,
      req?.files?.imgCover?.[0]?.buffer,
      req.files?.images?.map((item) => item?.buffer)
    );

    data = addLinks(req, data[0], ["imgCover", "images"]);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    const updateProd = getProductData(req);

    let data = await productService.updateOne(
      req.params.id,
      updateProd,
      req.files?.imgCover?.[0]?.buffer,
      req.files?.images?.map((item) => item?.buffer)
    );

    data = addLinks(req, data[0], ["imgCover", "images"]);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    await productService.deleteOne(req.params.id);
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
    const data = productService.getOptions();

    res.status(200).json({
      status: "succes",
      data,
    });
  } catch (err) {
    next(err);
  }
};
