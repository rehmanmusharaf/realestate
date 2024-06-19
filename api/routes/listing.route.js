import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getListingsWithPagination,
  deleteListingbyadmin,
  updateListingbyadmin,
} from "../controllers/listing.controller.js";
import { verifyToken, verifyadminToken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.delete("/deletebyadmin/:id", verifyadminToken, deleteListingbyadmin);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
router.get("/getlisting", verifyadminToken, getListingsWithPagination);
router.put("/updatelistingbyadmin/:id", verifyadminToken, updateListingbyadmin);

export default router;
