import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  refreshTokens: [
    {
      refreshToken: { type: String, required: true },
      device: { type: String, required: true },
    },
  ],
});

const tokenModel = mongoose.model("Token", tokenSchema);

export default tokenModel;
