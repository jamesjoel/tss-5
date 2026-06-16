import mongoose from '../config/conn.js'

const RatingSchema = mongoose.Schema({
    hotelId : { type : mongoose.Schema.Types.ObjectId, ref : "hotel"},
    userId : { type : mongoose.Schema.Types.ObjectId, ref : "user"},
    rating : Number,
    review : { default : "", type : String }
}, {timestamps : true})

const Rating = mongoose.model("rating", RatingSchema)

export default Rating;