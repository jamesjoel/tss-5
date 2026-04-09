import mongoose from '../config/conn.js'

let CusSchema = mongoose.Schema({
    title : String
}, {timestamps : true})

let CusModel = mongoose.model("cuisine", CusSchema)

export default CusModel;