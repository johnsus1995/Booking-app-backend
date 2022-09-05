import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();
router.get("/", getAllHotels);

router.post("/", createHotel);

router.put("/:id", updateHotel);

router.delete("/:id", deleteHotel);

router.get("/find/:id", getHotel);


router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router;
