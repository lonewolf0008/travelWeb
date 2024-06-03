const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//insert review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deletingReview));

module.exports = router;
