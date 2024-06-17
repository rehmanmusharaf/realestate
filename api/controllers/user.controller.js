import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  console.log("api end point hit : ", req.user.id, req.params.id);
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      // console.log("user Listing is: ", listings);
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
export const getUserListingsbyadmin = async (req, res, next) => {
  // console.log("api end point hit : ", req.user.id, req.params.id);
  if (req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    console.log("API End Point hit!");
    // console.log("Req.user is: ", req.user);
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page is specified
    const limit = 5; // Limit to 5 users per page
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password") // Exclude the password field
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    // Get current date
    const now = new Date();

    // Helper function to get the start of the month
    const getStartOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    };

    // Get the start of the current month, last month, and two months ago
    const startOfCurrentMonth = getStartOfMonth(now);
    const startOfLastMonth = getStartOfMonth(
      new Date(now.getFullYear(), now.getMonth() - 1, 1)
    );
    const startOfTwoMonthsAgo = getStartOfMonth(
      new Date(now.getFullYear(), now.getMonth() - 2, 1)
    );

    // Query to get user counts for each of these months
    const currentMonthCount = await User.countDocuments({
      createdAt: { $gte: startOfCurrentMonth },
    });

    const lastMonthCount = await User.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: startOfCurrentMonth },
    });

    const twoMonthsAgoCount = await User.countDocuments({
      createdAt: { $gte: startOfTwoMonthsAgo, $lt: startOfLastMonth },
    });

    res.status(200).json({
      totalUsers,
      totalPages,
      currentPage: page,
      users,
      userCounts: {
        currentMonth: currentMonthCount,
        lastMonth: lastMonthCount,
        twoMonthsAgo: twoMonthsAgoCount,
      },
    });
  } catch (error) {
    console.log("error is: ", error);
    next(error);
  }
};
export const getUserbyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found!"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
