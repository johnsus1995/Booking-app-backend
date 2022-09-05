import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
      next(error)
    }
  };

  export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      next(error)
    }
  };

  export const getUser = async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  };

  export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
      next(error)
    }
  };