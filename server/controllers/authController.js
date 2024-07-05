import UserService from "../services/userService.js";
import AuthService from "../services/authService.js";
import AuthDTO from "../dto/authDTO.js";
import Mailer from "../services/mailerService.js";
import sendResponse from "../utils/sendResponse.js";

export const signup = async (req, res, next) => {
  try {
    const userService = new UserService();
    const authService = new AuthService();
    const mailer = new Mailer();
    const device = req.headers["user-agent"];

    const { name, lastName, email, password } = req.body;
    const userData = await userService.addOne({ name, lastName, email, password });

    const payload = new AuthDTO(userData);
    const tokens = authService.generateTokens({ ...payload });
    await authService.saveToken(payload.id, tokens.refreshToken, device);

    await mailer.sendMail(
      userData.email,
      "Ваш аккаунт успішно створено!",
      "welcomeEmail.ejs",
      { name: userData.name, link: `${process.env.CLIENT_URL}/account` }
    );

    res.cookie("refresh", tokens.refreshToken, {
      httpOnly: true,
      secure: !!req.secure,
    });

    res.cookie("access", tokens.accessToken, {
      httpOnly: true,
      secure: !!req.secure,
    });

    sendResponse({ res, statusCode: 201, data: userData });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const userService = new UserService();
    const authService = new AuthService();
    const device = req.headers["user-agent"];

    const { email, password } = req.body;
    const userData = await userService.login(email, password);

    const payload = new AuthDTO(userData);
    const tokens = authService.generateTokens({ ...payload });

    await authService.saveToken(payload.id, tokens.refreshToken, device);

    res.cookie("refresh", tokens.refreshToken, {
      httpOnly: true,
      secure: !!req.secure,
    });
    res.cookie("access", tokens.accessToken, {
      httpOnly: true,
      secure: !!req.secure,
    });

    sendResponse({ res, statusCode: 200, data: userData });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const authService = new AuthService();
    const refreshToken = req.cookies.refresh;
    const device = req.headers["user-agent"];

    await authService.removeToken(refreshToken, device);

    res.clearCookie("refresh");
    res.clearCookie("access");

    sendResponse({ res, statusCode: 204, data: null });
  } catch (e) {
    next(e);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const userService = new UserService();
    const authService = new AuthService();
    const device = req.headers["user-agent"];
    const { refresh: refreshToken } = req.cookies;

    const tokenData = await authService.validateRefreshToken(refreshToken);
    await authService.findUserTokens(tokenData.id);

    const user = await userService.getOne(tokenData.id);
    const payload = new AuthDTO(user);
    const tokens = authService.generateTokens({ ...payload });

    await authService.saveToken(payload.id, tokens.refreshToken, device);

    res.cookie("refresh", tokens.refreshToken, {
      httpOnly: true,
      secure: !!req.secure,
    });
    res.cookie("access", tokens.accessToken, {
      httpOnly: true,
      secure: !!req.secure,
    });

    sendResponse({ res, statusCode: 200, data: user });
  } catch (e) {
    next(e);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const userService = new UserService();
    const mailer = new Mailer();
    const { path, email } = req.body;

    const letterData = await userService.createResetToken(email, path);

    await mailer.sendMail(
      email,
      "Запит на скидання пароля",
      "resetPassEmail.ejs",
      letterData
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const userService = new UserService();
    const authService = new AuthService();

    const user = await userService.resetPassword(
      req.params.token,
      req.query.email,
      req.body.password
    );

    const tokensData = await authService.findUserTokens(user.id);

    tokensData.refreshTokens.forEach(async (item) => {
      await authService.removeOldTokens(user._id, item.refreshToken, item.device);
    });

    sendResponse({ res, statusCode: 200 });
  } catch (error) {
    next(error);
  }
};
