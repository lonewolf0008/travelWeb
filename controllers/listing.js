const Listing = require("../models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("./listings/listing.ejs", { allListing });
};

module.exports.newListing = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const list = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "Data is dose not exits 😵");
    res.redirect("/listing");
  }
  // console.log(list);
  res.render("./listings/show.ejs", { list });
};

module.exports.createListing = async (req, res, next) => {
  let coordinates = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  // console.log(coordinates.body.features[0].geometry);
  // res.send("ok!");

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);

  const newListing = new Listing(req.body.listing);
  // console.log(req.user);
  newListing.owner = req.user._id;
  newListing.image = { filename, url };
  newListing.geometry = coordinates.body.features[0].geometry;
  // console.log(newListing);
  await newListing.save();
  req.flash("success", " new Listing is added 👍");
  res.redirect("/listing");
};

module.exports.getUpdateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Data is not exits 😵 ");
    res.redirect("/listing");
  }

  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/h_200,w_300");
  res.render("./listings/edit.ejs", { listing, originalImage });
};

module.exports.updatingListing = async (req, res) => {
  let { id } = req.params;
  let geocodeResponse = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  if (geocodeResponse.body.features.length > 0) {
    let coordinates = geocodeResponse.body.features[0].geometry;
    req.body.listing.geometry = coordinates;
  } else {
    req.flash("error", "Invalid location provided.");
    return res.redirect(`/listing/${id}/edit`);
  }

  // Updating the listing with new data
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { filename, url };
    await listing.save();
  }

  req.flash("success", "Listing is Update 👍 ");
  res.redirect(`/listing/${id}`);
};

module.exports.deletingListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("success", "Listing is Deleted 👍");
  res.redirect("/listing");
};
