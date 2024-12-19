const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");


module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("./listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
   
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"
            
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","listing doent exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    //listing.reviews.forEach(review => { console.log(review.author.username); });
    res.render("./listings/show.ejs",{listing})
};

module.exports.createListing = async(req,res)=>{
    //let {title,description,image,price,country,location} = req.body;
        let url = req.file.path;
        let filename = req.file.filename;
        const newlisting = new Listing(req.body.listing);
        newlisting.image = {url,filename};
        newlisting.owner = req.user._id;
        
        //console.log(url ,"..",filename);
        await newlisting.save();
        req.flash("success","New listing is created!");
        res.redirect("/listings");
    
   
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id); 
    if(!listing){
        req.flash("error","listing doent exist!");
        res.redirect("/listings");
    }
    let OriginalImageUrl = listing.image.url;
    OriginalImageUrl=OriginalImageUrl.replace("/upload","/upload/w_200");
    res.render("listings/edit.ejs",{listing,OriginalImageUrl});
};

module.exports.updateListing = async (req,res)=>{
    let {id}=req.params;
   // console.log(req.params);
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
   

    req.flash("success","listing is updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async(req,res)=>{
    let {id} =req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","listing is deleted!");
    res.redirect("/listings");
};