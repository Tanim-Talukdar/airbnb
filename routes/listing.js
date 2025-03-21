const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  //Index Route
  .get(wrapAsync(listingControllers.index))
  //Create Route
  .post( isLoggedIn,upload.single("listing[image]"),  validateListing, wrapAsync(listingControllers.create));
  
  
//New Route
router.get("/new", isLoggedIn, listingControllers.new);


router.route("/:id")
  //Show Route
  .get(wrapAsync(listingControllers.show))
  //Update Route
  .put(isLoggedIn, isOwner, upload.single("listing[image]"),  validateListing, wrapAsync(listingControllers.update))
  //Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.delete));



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.edit));


module.exports = router;