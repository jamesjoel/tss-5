import mongoose from '../config/conn.js'
const DonateSchema = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref:"user"},
    amount : Number,
    trid : String,
    refnum : String
}, { timestamps : true })

const Donate = mongoose.model("donate", DonateSchema)

export default Donate;