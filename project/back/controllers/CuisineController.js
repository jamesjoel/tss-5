import CusModel from "../models/Cuisine.js";

let SaveCus = async(req, res)=>{
    let result= await CusModel.create(req.body);
    res.send({success:true, result:result})
}
let GetAllCus = async(req, res)=>{
    let result= await CusModel.find();
    res.send({success:true, result:result})
}
let GetCusById = async(req, res)=>{
    let id = req.params.id;
    let result= await CusModel.find({_id : id});
    res.send({success:true, result:result[0]})
}
let UpdateCus = async(req, res)=>{
    let id = req.params.id;
    let result= await CusModel.updateMany({_id : id}, req.body);
    res.send({success:true, result:result})
}
let DelteCus = async(req, res)=>{
    let id = req.params.id;
    let result= await CusModel.deleteMany({_id : id});
    res.send({success:true, result:result})
}

export {SaveCus, UpdateCus, DelteCus, GetAllCus, GetCusById}