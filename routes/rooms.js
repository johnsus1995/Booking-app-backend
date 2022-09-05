import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/room.js";

const router = express.Router();

//remember to verify admin here
router.post("/:hotelId", createRoom);
router.post("/:id", updateRoom);
router.post("/:hotelId/:roomId", deleteRoom);
router.post("/:id", getRoom);
router.get("/get-all-rooms", getAllRooms);

export default router;
