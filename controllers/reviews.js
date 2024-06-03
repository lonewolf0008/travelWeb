const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  // console.log(req.params.id);
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  // console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log("review saved");
  req.flash("success", "New Review is added 👍");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.deletingReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review is deleted 👍");
  res.redirect(`/listing/${id}`);
};
