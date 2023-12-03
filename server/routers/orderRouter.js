import express from "express";
import * as orderController from "../controllers/orderController.js";
import protect from "../middlewares/protect.js";
import { idValidationSchema } from "../validations/idValidation.js";
import { checkSchema } from "express-validator";
import { orderValidationSchema } from "../validations/orderValidation.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(checkSchema(orderValidationSchema), orderController.addOrder)
  .get(protect(), orderController.getAllOrders);

orderRouter.get("/options", orderController.getOptions);

orderRouter
  .route("/:id")
  .get(protect(), checkSchema(idValidationSchema), orderController.getOrder);

export default orderRouter;
