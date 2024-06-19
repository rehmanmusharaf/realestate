import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const deleteListingbyadmin = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, "You can only delete your own listings!"));
  // }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const updateListingbyadmin = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  try {
    const { available } = req.body;
    // Update only the 'available' field
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: { available } },
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    console.log("Api End Point HIt");
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getListingsWithPagination = async (req, res, next) => {
  try {
    // console.log("API End Point Hit");

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = (page - 1) * limit;

    const listings = await Listing.find().limit(limit).skip(startIndex);
    const rentlistingcount = await Listing.countDocuments({ type: "rent" });
    const salelistingcount = await Listing.countDocuments({ type: "sale" });
    const salenotavailablecount = await Listing.countDocuments({
      type: "sale",
      available: false,
    });
    const result = await Listing.aggregate([
      { $match: { available: false } },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: {
              $cond: {
                if: { $gt: ["$discountPrice", null] },
                then: "$discountPrice",
                else: "$regularPrice",
              },
            },
          },
        },
      },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    // console.log("total amount is: ", totalAmount);
    const rentnotavailablecount = await Listing.countDocuments({
      type: "rent",
      available: false,
    });
    console.log(
      rentlistingcount,
      salelistingcount,
      salenotavailablecount,
      rentnotavailablecount
    );
    const totalListings = await Listing.countDocuments();
    const totalPages = Math.ceil(totalListings / limit);

    return res.status(200).json({
      totalListings,
      totalPages,
      currentPage: page,
      listings,
      salesamount: totalAmount,
      rentlistingcount,
      salelistingcount,
      salenotavailablecount,
      rentnotavailablecount,
    });
  } catch (error) {
    next(error);
  }
};
