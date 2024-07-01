import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import tokenModel from "../models/tokenModel.js";
import AppError from "../utils/appError.js";
import AuthDTO from "../dto/authDTO.js";

dotenv.config({ path: "./.env" });

export default class authService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token) {
    try {
      const data = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_SECRET);
      return new AuthDTO(data);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) throw new jwt.TokenExpiredError();
      throw new AppError("Invalid access token", 401);
    }
  }

  async validateRefreshToken(token) {
    try {
      const data = await promisify(jwt.verify)(token, process.env.JWT_REFRESH_SECRET);
      return new AuthDTO(data);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError)
        throw new AppError("you are not log in!", 401);
      throw new AppError("Invalid refresh token", 400);
    }
  }

  async saveToken(userId, refreshToken, device) {
    const tokenData = await tokenModel.findOne({ user: userId });
    let token;

    if (tokenData) {
      const devices = tokenData.refreshTokens.map((item) => item.device);

      if (devices.includes(device)) {
        const index = devices.indexOf(device);
        tokenData.refreshTokens[index].refreshToken = refreshToken;
      } else {
        tokenData.refreshTokens.push({ refreshToken, device });
      }
      token = tokenData.save();
    } else {
      token = await tokenModel.create({
        user: userId,
        refreshTokens: { refreshToken, device },
      });
    }
    return token;
  }

  async removeToken(refreshToken, device) {
    const user = await this.validateRefreshToken(refreshToken);
    if (!user) throw new AppError("Invalid token!", 400);

    await tokenModel.findOneAndUpdate(
      { user: user.id },
      {
        $pull: {
          refreshTokens: {
            refreshToken,
            device,
          },
        },
      }
    );
  }

  async removeOldTokens(userId, refreshToken, device) {
    await tokenModel.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          refreshTokens: {
            refreshToken,
            device,
          },
        },
      }
    );
  }

  async findUserTokens(userId) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (!tokenData) throw new AppError("You are not log in!", 401);

    return tokenData;
  }
}
