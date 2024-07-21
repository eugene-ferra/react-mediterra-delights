import https from "https";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({ path: "./.env" });

let sslOptions = {};

if (process.env.SSL_KEY_PATH && process.env.SSL_CRT_PATH) {
  sslOptions = {
    key: fs.readFileSync(path.resolve(process.env.SSL_KEY_PATH)),
    cert: fs.readFileSync(path.resolve(process.env.SSL_CRT_PATH)),
  };
}

mongoose
  .connect(process.env.MONGO_CONNECT_STRING)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

let server;

if (process.env.SSL_KEY_PATH && process.env.SSL_CRT_PATH) {
  server = https.createServer(sslOptions, app).listen(port, () => {
    console.log("HTTPS server is running on port 443");
  });
} else {
  server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
