import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils.js/error.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("New user created successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return next(createError(404, "User does'nt exist!"));
    }
    const isPasswordTrue = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordTrue) {
      return next(createError(400, "Incorrect password"));
    } else {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password, isAdmin, ...rest } = user._doc;
      
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
