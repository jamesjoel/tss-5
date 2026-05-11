import mongoose from "../config/conn.js";

let AmenitiesSchema = mongoose.Schema({
   name : String,
    
})

let Amenities = mongoose.model("amenities", AmenitiesSchema)
export default Amenities;