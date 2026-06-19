import mongoose from '../config/conn.js'
const DonateSchema = mongoose.Schema({
    userId : { type : mongoose.Schema.Types.ObjectId, ref:"user"},
    amount : Number,
    razorpay_payment_id : String,
    razorpay_order_id : String
}, { timestamps : true })

const Donate = mongoose.model("donate", DonateSchema)

export default Donate;