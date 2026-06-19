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

let PaymentDone = async(req, res)=>{
    let id = req.userobj.id;
    let obj = {
        userId : id,
        amount : req.body.amount,
        razorpay_payment_id : req.body.razorpay_payment_id,
        razorpay_order_id : req.body.razorpay_order_id
    }
    await Donate.create(obj);
    res.send({success:true})
}   

let GetAllDonation = async(req, res)=>{
    let result = await Donate.find().populate("userId").exec();
    res.send({success:true, result});
}

export {MakePayment, PaymentDone, GetAllDonation}