import mongoose from '../config/conn.js'

const HotelSchema = mongoose.Schema({
    name : String,
    person : String,
    contact : String,
    address : String,
    lat : Number,
    long : Number,
    type : String,
    cost : String,
    desc : String,
    amenitiesId : [{ type : mongoose.Schema.Types.ObjectId, ref : "amenities" }],
    cuisineId : [{ type : mongoose.Schema.Types.ObjectId, ref : "cuisine" }],
    open : String,
    close : String,
    year : Number

}, {timestamps : true})

let Hotels = mongoose.model("hotel", HotelSchema)

export default Hotels;

/*
hobby : [String]

*/