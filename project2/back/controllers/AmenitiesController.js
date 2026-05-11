import Amenities from '../models/Amenities.js'

let SaveAmenities = async(req, res)=>{
    let result = await Amenities.create(req.body);
    res.send({success:true, result})
}
let GetAmenities = async(req, res)=>{
    let result = await Amenities.find();
    res.send({success:true, result})
}
let GetAmenitiesById = async(req, res)=>{
    let id = req.params.id;
    let result = await Amenities.find({_id : id});
    res.send({success:true, result : result[0]})
}
let UpdateAmenities = async(req, res)=>{
    let id = req.params.id;
    let result = await Amenities.updateMany({_id : id},req.body);
    res.send({success:true, result})
}
let DeleteAmenities = async(req, res)=>{
    let id = req.params.id;
    let result = await Amenities.deleteMany({_id : id});
    res.send({success:true, result})
}

export {SaveAmenities, UpdateAmenities, DeleteAmenities, GetAmenities, GetAmenitiesById}