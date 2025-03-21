const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn ,validateReview,isReviewAuthor } = require("../middleware.js");
const reviewControllers = require("../controllers/review.js");


// Reviews
router.post("/", isLoggedIn ,validateReview, wrapAsync(reviewControllers.reviews));

  //review Delete Route
router.delete("/:reviewId",isLoggedIn , isReviewAuthor, wrapAsync(reviewControllers.reviewDelete));

module.exports = router;