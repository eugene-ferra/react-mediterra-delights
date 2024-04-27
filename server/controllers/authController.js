import userService from "../services/userService.js";
import { validationResult } from "express-validator";

export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { name, lastName, email, password } = req.body;
    const userData = await userService.registration({
      name,
      lastName,
      email,
      password,
      device: req.headers["user-agent"],
    });
    res.cookie("refresh", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });

    res.cookie("access", userData.accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });

    res.status(201).json({
      status: "success",
      data: userData.user,
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const userData = await userService.login(email, password, req.headers["user-agent"]);
    res.cookie("refresh", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });
    res.cookie("access", userData.accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });
    res.status(200).json({
      status: "success",
      data: userData.user,
    });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const refreshToken = req.cookies.refresh;
    await userService.logout(refreshToken, req.headers["user-agent"]);
    res.clearCookie("refresh");
    res.clearCookie("access");
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    next(e);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    const { refresh } = req.cookies;
    const userData = await userService.refresh(refresh, req.headers["user-agent"]);
    res.cookie("refresh", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });
    res.cookie("access", userData.accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: req.secure ? true : false,
    });
    res.status(200).json({
      status: "success",
      data: userData.user,
    });
  } catch (e) {
    next(e);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    await userService.sendResetToken(req.body.email, req.body.path);
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors.array(),
      });
    }

    await userService.resetPassword(
      req.params.token,
      req.query.email,
      req.body.password
    );
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
