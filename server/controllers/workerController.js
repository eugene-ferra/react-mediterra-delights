import { validationResult } from "express-validator";
import workerService from "../services/workerService.js";
import addLinks from "../utils/addLinks.js";
import getQueryData from "../utils/getQueryData.js";

export const getWorkers = async (req, res, next) => {
  try {
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    const data = await workerService.getAll({
      filterObj,
      sortObj,
      page,
      limit,
    });

    data[1].map((doc) => addLinks(req, doc, ["photo"]));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const getWorker = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    let data = await workerService.getOne({ id: req.params.id });

    data = addLinks(req, data[0], ["photo"]);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const addWorker = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !req?.files?.photo?.[0]?.buffer) {
      return res.status(400).json({
        status: "fail",
        errors: req?.files?.photo?.[0]?.buffer
          ? errors.array()
          : [
              ...errors.array(),
              { path: "photo", msg: "Будь-ласка, додайте фото працівника!" },
            ],
      });
    }

    let data = await workerService.addOne(req.body, req?.files?.photo?.[0]?.buffer);

    data = addLinks(req, data[0], ["photo"]);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const updateWorker = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    const updateObj = req.body;

    let data = await workerService.updateOne(
      req.params.id,
      updateObj,
      req.files?.photo?.[0]?.buffer || null
    );

    data = addLinks(req, data[0], ["photo"]);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
export const deleteWorker = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }
    await workerService.deleteOne(req.params.id);
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
    const data = workerService.getOptions();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
