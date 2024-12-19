const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    //console.log(req.params.id);
    let newReview = new Review(req.body.review);
    //console.log(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    //console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review is created!");
    res.redirect(`/listings/${req.params.id}`)
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findById(reviewId);
    req.flash("success","review is deleted!");
    res.redirect(`/listings/${id}`);

};
