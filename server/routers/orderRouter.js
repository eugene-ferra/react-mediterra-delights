import express from "express";
import { checkSchema } from "express-validator";
import multer from "multer";
import * as orderController from "../controllers/orderController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import {
  orderProceedValidation,
  orderValidationSchema,
  orderValidationStrictSchema,
} from "../validations/orderValidation.js";

const orderRouter = express.Router();

orderRouter.use(multer({ storage: multer.memoryStorage() }).none());
orderRouter
  .route("/")
  .post(checkSchema(orderValidationStrictSchema), orderController.addOrder)
  .get(protect(), orderController.getAllOrders);

orderRouter.get("/options", orderController.getOptions);

orderRouter.get("/stats/:year/", orderController.getStatsByYear);
orderRouter.get("/stats/:year/:month", orderController.getStatsByMonth);

orderRouter
  .route("/:id")
  .get(orderController.getOrder)
  .patch(
    protect(),
    restrictTo("admin"),
    checkSchema(orderValidationSchema),
    orderController.updateOrder
  );

orderRouter.patch(
  "/:id/proceed",
  protect(),
  restrictTo("admin"),
  checkSchema(orderProceedValidation),
  orderController.proceedOrder
);

orderRouter.post(
  "/create-checkout",
  checkSchema(orderValidationStrictSchema),
  orderController.createCheckout
);

export default orderRouter;
