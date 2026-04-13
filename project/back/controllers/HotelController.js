import Hotel from "../models/Hotels.js";

let SaveHotel = async(req, res)=>{
    // console.log(req.body)
    // return;
    let result= await Hotel.create(req.body);
    res.send({success:true, result:result})
}
let GetAllHotel = async(req, res)=>{
    let result= await Hotel.find();
    res.send({success:true, result:result})
}
let GetHotelById = async(req, res)=>{
    let id = req.params.id;
    let result= await Hotel.find({_id : id});
    res.send({success:true, result:result[0]})
}
let UpdateHotel = async(req, res)=>{
    let id = req.params.id;
    let result= await Hotel.updateMany({_id : id}, req.body);
    res.send({success:true, result:result})
}
let DelteHotel = async(req, res)=>{
    let id = req.params.id;
    let result= await Hotel.deleteMany({_id : id});
    res.send({success:true, result:result})
}

export {SaveHotel, UpdateHotel, DelteHotel, GetAllHotel, GetHotelById}