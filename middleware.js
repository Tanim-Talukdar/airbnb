const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");



module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error", "You have no permission to edit!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id ,reviewId } = req.params
    const review = await Review.findById(reviewId);
    
    if (!review) {
        return res.status(404).send("Review not found.");
    }
    if (!review || !review.author || !review.author._id) {
        return res.status(400).send("Invalid review or missing author.");
    }
    if(!review.author._id.equals(res.locals.currentUser._id)){
        req.flash("error", "You have no permission to delete!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req , res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(","); 
        throw new ExpressError(400, error);
    } else{
        next();
    }
};

module.exports.validateReview = (req , res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(","); 
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
};

