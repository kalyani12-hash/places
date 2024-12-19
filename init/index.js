const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGODB_URL='mongodb://127.0.0.1:27017/wanderlust';
//const dbUrl=process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("data is saved");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGODB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
      ...obj,owner:'675da234ac8beafbe16951e5',
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

}
initDB();