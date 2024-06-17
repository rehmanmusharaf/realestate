import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
  getAllUsers,
  getUserbyAdmin,
  getUserListingsbyadmin,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();
router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/listingsbyadmin/:id", getUserListingsbyadmin);
router.get("/getallusers", getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/getuserbyadmin/:id", getUserbyAdmin);
router.post("/updatebyadmin/:id", updateUser);
router.delete("/deletebyadmin/:id", deleteUser);
// router.get("/listingsbyadmin/:id", getUserListings);
export default router;
