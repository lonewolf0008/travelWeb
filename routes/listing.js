const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingControllers = require("../controllers/listing.js");

//cloudinary config

const { storage } = require("../cloudConfig.js");


//file upload
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const upload = multer({storage });

router
    .route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn, upload.single("listing[image][url]"), validateListing, wrapAsync(listingControllers.createListing));
  

//New Route
router.get("/new", isLoggedIn, listingControllers.newListing);

router
    .route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(isOwner,upload.single("listing[image][url]"), validateListing, wrapAsync(listingControllers.updatingListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deletingListing));


//update route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.getUpdateListing));


module.exports = router;
