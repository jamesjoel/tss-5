import mongoose from "../config/conn.js";

let CuisineSchema = mongoose.Schema({
   
    name : String,
   
    
})

let Cuisine = mongoose.model("cuisine", CuisineSchema)
export default Cuisine;