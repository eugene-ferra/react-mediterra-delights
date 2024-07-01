import CommentService from "../services/commentService.js";
import getQueryData from "../utils/getQueryData.js";
import sendResponse from "../utils/sendResponse.js";

export const addComment = async (req, res, next) => {
  try {
    const commentService = new CommentService();

    const newComment = {
      articleID: req.body.articleID,
      userID: req.body.userID,
      comment: req.body.comment,
    };

    const data = await commentService.addOne(newComment);

    sendResponse({ res, statusCode: 201, data: data });
  } catch (err) {
    next(err);
  }
};

export const getAllComments = async (req, res, next) => {
  try {
    const commentService = new CommentService();

    let { filterObj } = getQueryData(req);
    const { sortObj, page, limit } = getQueryData(req);
    // If productID is provided, get reviews for that product only
    if (req.params.articleID) {
      filterObj = { ...filterObj, articleID: req.params.articleID, isModerated: true };
    }

    const data = await commentService.getAll({ filterObj, sortObj, page, limit });
    const pages = await commentService.countPages(filterObj, limit);

    sendResponse({ res, statusCode: 200, data: { pages, data } });
  } catch (err) {
    next(err);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const commentService = new CommentService();
    const { id, articleID } = req.params;

    const data = await commentService.getOne({ id, articleID });

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const commentService = new CommentService();

    const commendId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;
    let commentBody = { comment: req.body.comment };

    if (userRole === "user") {
      await commentService.checkUserCanChangeComment(commendId, userId);
    } else {
      commentBody = { ...commentBody, isModerated: req.body.isModerated };
    }

    const doc = await commentService.updateOne(commendId, commentBody);

    sendResponse({ res, statusCode: 200, data: doc });
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const commentService = new CommentService();
    const userRole = req.user.role;
    const userId = req.user._id;
    const commentId = req.params.id;

    if (userRole === "user") {
      await commentService.checkUserCanChangeComment(commentId, userId);
    }

    await commentService.deleteOne(commentId);

    sendResponse({ res, statusCode: 204 });
  } catch (error) {
    next(error);
  }
};
