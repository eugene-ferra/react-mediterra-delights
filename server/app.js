import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";
import productRouter from "./routers/ProductRouter.js";
import AppError from "./utils/appError.js";
import * as globalErrorHandler from "./controllers/errorController.js";
import reviewRouter from "./routers/reviewRouter.js";
import articleRouter from "./routers/articleRouter.js";
import commentRouter from "./routers/commentRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import morgan from "morgan";
import cors from "cors";
import Stripe from "stripe";
import { proceedPayment } from "./controllers/orderController.js";
const app = express();

app.set("trust proxy", 1);
app.use(cors({ origin: true, credentials: true }));

app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// app.use(
//   "/api",
//   rateLimit({
//     max: 500,
//     windowMs: 60 * 60 * 1000,
//     message: "Too many requests from this IP, please try again in an hour!",
//   })
// );

app.post("/webhook", express.raw({ type: "application/json" }), proceedPayment);

app.use(express.json({ limit: "10000kb" }));

app.use(express.urlencoded({ extended: true, limit: "10000kb" }));
app.use(cookieParser());

app.use(hpp());

app.use(compression());
app.use(ExpressMongoSanitize());

app.use("/api/articles", articleRouter);
app.use(xss());
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static("public"));

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't proceed ${req.method} method on ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler.default);

export default app;
