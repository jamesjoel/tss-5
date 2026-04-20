import Amenities from "../models/Amenities.js";
import Hotel from '../models/Hotels.js'

let SaveAmenities = async(req, res)=>{
    let result= await Amenities.create(req.body);
    res.send({success:true, result:result})
}
let GetAllAmenities = async(req, res)=>{
    let result= await Amenities.find();
    res.send({success:true, result:result})
}
let GetAmenitiesById = async(req, res)=>{
    let id = req.params.id;
    let result= await Amenities.find({_id : id});
    res.send({success:true, result:result[0]})
}
let UpdateAmenities = async(req, res)=>{
    let id = req.params.id;
    let result= await Amenities.updateMany({_id : id}, req.body);
    res.send({success:true, result:result})
}
let DelteAmenities = async(req, res)=>{
    let id = req.params.id;
    let result= await Amenities.deleteMany({_id : id});

    let hotelResult = await Hotel.find({ amenitiesId : {$in : [id]} })
    


    res.send({success:true, result:result})
}

export {SaveAmenities, UpdateAmenities, DelteAmenities, GetAllAmenities, GetAmenitiesById}