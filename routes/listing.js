const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const User = require("../models/user");
const Review=require("../models/review.js");
const Listing=require("../models/listing");
const {isloggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const { render } = require("ejs");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage});

router 
    .route('/') 
    //Index Route
    .get(wrapAsync(listingController.index)) 
    //create Route
    .post( isloggedIn, 
         
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing ) );
    
        

//New Route
router.get("/new",isloggedIn,listingController.renderNewForm)




router
    .route("/:id")
    //show Route
    .get(
        wrapAsync(listingController.showListing))
        //Update Route
    .put(isloggedIn,
            isOwner,
            upload.single("listing[image]"),
           validateListing,
            wrapAsync(listingController.updateListing))
            //Delete 
            .delete(isOwner,wrapAsync(listingController.destroyListing));






//Edit Route
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.renderEditForm));




module.exports=router;
