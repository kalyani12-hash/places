const express = require("express");
const router = express.Router({mergeParams:true});
const Listing=require("../models/listing");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const {validateReview,isloggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//review
//post review
router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.createReview));


//review delete
router.delete("/:reviewId",isloggedIn,isReviewAuthor,
    wrapAsync(reviewController.destroyReview))

module.exports=router;



