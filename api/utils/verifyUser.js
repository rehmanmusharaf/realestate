import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import usermodel from "../models/user.model.js";
export const verifyToken = (req, res, next) => {
  // console.log("Verify Token Function Run!", req.cookies.access_token);
  const token = req.cookies.access_token;
  // console.log("token is: ", token);
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
export const verifyadminToken = (req, res, next) => {
  // console.log("Verify Token by admin Function Run!", req.cookies);
  const token = req.cookies.access_token;
  // console.log("token is: ", token);
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    user = await usermodel.findById(user.id);
    if (user.role != "admin") return next(errorHandler(401, "unAuthorized"));
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
