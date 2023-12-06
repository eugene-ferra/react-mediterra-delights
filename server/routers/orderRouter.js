import express from "express";
import * as orderController from "../controllers/orderController.js";
import protect from "../middlewares/protect.js";
import restrictTo from "../middlewares/restrictTo.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";
import {
  orderProceedValidation,
  orderValidationSchema,
  orderValidationStrictSchema,
} from "../validations/orderValidation.js";
import multer from "multer";

const orderRouter = express.Router();

orderRouter.use(multer({ storage: multer.memoryStorage() }).none());
orderRouter
  .route("/")
  .post(checkSchema(orderValidationStrictSchema), orderController.addOrder)
  .get(protect(), orderController.getAllOrders);

orderRouter.get("/options", orderController.getOptions);

orderRouter
  .route("/:id")
  .get(protect(), checkSchema(idValidationSchema), orderController.getOrder)
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

export default orderRouter;
