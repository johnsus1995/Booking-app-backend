import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } //send newest version of the document
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const id = req.params.roomId;
  const hotelId = req.params.hotelId;

  try {
    await Room.findByIdAndDelete(id);
    try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: id },
        });
      } catch (error) {
        next(error);
      }
    res.status(200).json("Room deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
