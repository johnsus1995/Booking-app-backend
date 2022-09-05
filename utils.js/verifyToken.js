import jwt from "jsonwebtoken";

import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(401, "you are not authenticated!");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, info) => {
    if (err) return next(createError(403, "Invalid token!"));
    req.user = info;
    next();
  });
};

//verify user

//verify if isAdmin

