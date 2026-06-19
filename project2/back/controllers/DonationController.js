import Donate from "../models/Donation.js";
import Razorpay from 'razorpay'

const RAZORPAY_KEY = "rzp_test_Rek8z2OtrReaiV";
const RAZORPAY_SECRET = "c3QZBCHSmaMmuLK9Gc9y1MtK";


const rzpy = new Razorpay({
    key_id : RAZORPAY_KEY,
    key_secret : RAZORPAY_SECRET
});


let MakePayment = async(req, res)=>{
    // console.log(req.body)
    // console.log(req.userobj)

    try{
        let order = await rzpy.orders.create({
            amount : req.body.amount * 100,
            currency : 'INR'
        })
        res.send({success:true, orderid : order.id});
    }catch(err){
        res.send({success:false})
    }
}

export {MakePayment}