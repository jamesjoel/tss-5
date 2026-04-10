// Amenities

import mongoose from '../config/conn.js'

let AmSchema = mongoose.Schema({
    title : String
}, {timestamps : true})

let CusModel = mongoose.model("amenities", AmSchema)

export default CusModel;