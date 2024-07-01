import WorkerService from "../services/workerService.js";
import getQueryData from "../utils/getQueryData.js";
import sendResponse from "../utils/sendResponse.js";

export const getWorkers = async (req, res, next) => {
  try {
    const workerService = new WorkerService();
    const { filterObj, sortObj, page, limit } = getQueryData(req);

    const data = await workerService.getAll({ filterObj, sortObj, page, limit });
    const pages = await workerService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { data, pages } });
  } catch (err) {
    next(err);
  }
};
export const getWorker = async (req, res, next) => {
  try {
    const workerService = new WorkerService();
    const data = await workerService.getOne(req.params.id);

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
export const addWorker = async (req, res, next) => {
  try {
    const workerService = new WorkerService();

    const data = await workerService.addOne(req.body, req?.files?.photo?.[0]?.buffer);

    sendResponse({ res, statusCode: 201, data });
  } catch (err) {
    next(err);
  }
};
export const updateWorker = async (req, res, next) => {
  try {
    const workerService = new WorkerService();
    const updateObj = req.body;

    const data = await workerService.updateOne(
      req.params.id,
      updateObj,
      req.files?.photo?.[0]?.buffer || null
    );

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
export const deleteWorker = async (req, res, next) => {
  try {
    const workerService = new WorkerService();
    await workerService.deleteOne(req.params.id);
    sendResponse({ res, statusCode: 204 });
  } catch (err) {
    next(err);
  }
};
export const getOptions = (req, res, next) => {
  try {
    const workerService = new WorkerService();
    const data = workerService.getOptions();

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
