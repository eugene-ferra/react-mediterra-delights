import ReviewService from "../services/reviewService.js";
import AuthService from "../services/authService.js";
import getQueryData from "../utils/getQueryData.js";
import getReviewData from "../utils/getReviewData.js";
import sendResponse from "../utils/sendResponse.js";

export const addReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const reviewBody = getReviewData(req);

    const doc = await reviewService.addOne(reviewBody);

    sendResponse({ res, statusCode: 201, data: doc });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const authService = new AuthService();

    let { filterObj } = getQueryData(req);
    const { sortObj, page, limit } = getQueryData(req);
    let userReview = null;

    // If productID is provided, get reviews for that product only
    if (req.params.productID) {
      filterObj = { ...filterObj, productID: req.params.productID, isModerated: true };
    }

    let data;
    try {
      data = await reviewService.getAll({ filterObj, sortObj, page, limit });
    } catch (error) {
      data = [];
    }

    const pages = await reviewService.countPages(filterObj, limit);

    if (req.cookies.access) {
      const decoded = await authService.validateAccessToken(req.cookies.access);

      const userReviews = await reviewService.getAll({
        filterObj: { userID: decoded.id },
      });

      userReview =
        // eslint-disable-next-line eqeqeq
        userReviews.find((review) => review.productID == filterObj.productID) || null;
    }

    sendResponse({ res, statusCode: 200, data: { pages, data, userReview } });
  } catch (err) {
    next(err);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();

    const { id, productID } = req.params;

    const data = await reviewService.getOne({ id, productID });

    sendResponse({ res, statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();

    const reviewId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;
    let reviewBody = {
      review: req.body.review,
      rating: req.body.rating,
    };

    if (userRole === "user") {
      reviewBody = {
        review: req.body.review,
        rating: req.body.rating,
      };

      await reviewService.checkUserCanChangeReview(reviewId, userId);
    } else {
      reviewBody = { ...reviewBody, isModerated: req.body.isModerated };
    }

    const doc = await reviewService.updateOne(reviewId, reviewBody);

    sendResponse({ res, statusCode: 200, data: doc });
  } catch (error) {
    next(error);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const userRole = req.user.role;
    const userId = req.user._id;
    const reviewId = req.params.id;

    if (userRole === "user") {
      await reviewService.checkUserCanChangeReview(reviewId, userId);
    }

    await reviewService.deleteOne(reviewId);

    sendResponse({ res, statusCode: 204 });
  } catch (error) {
    next(error);
  }
};

export const getOptions = (req, res, next) => {
  try {
    const reviewService = new ReviewService();

    const data = reviewService.getOptions();

    sendResponse({ res, statusCode: 200, data });
  } catch (err) {
    next(err);
  }
};
