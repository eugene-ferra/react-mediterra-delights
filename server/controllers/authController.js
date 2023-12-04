import userService from "../services/userService.js";
import { checkBodyErrors } from "../utils/checkBodyErrors.js";

export const signup = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

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
      secure: true,
    });

    res.cookie("access", userData.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
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
    checkBodyErrors(req, res);

    const { email, password } = req.body;
    const userData = await userService.login(email, password, req.headers["user-agent"]);
    res.cookie("refresh", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.cookie("access", userData.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
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
    checkBodyErrors(req, res);

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
    checkBodyErrors(req, res);

    const { refresh } = req.cookies;
    const userData = await userService.refresh(refresh, req.headers["user-agent"]);
    res.cookie("refresh", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    res.cookie("access", userData.accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
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
    checkBodyErrors(req, res);

    await userService.sendResetToken(req.body.email);
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    checkBodyErrors(req, res);

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
