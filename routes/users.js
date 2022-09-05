import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../utils.js/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, (req, res, next) => {
  res.send("you are logged in bruh!");
});

router.post("/update-user", updateUser);
router.post("/delete-user", deleteUser);
router.post("/get-user", getUser);
router.get("/get-all-users", getAllUsers);

export default router;
