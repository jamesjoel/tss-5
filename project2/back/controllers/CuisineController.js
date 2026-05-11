import Cuisine from '../models/Cuisine.js'

let SaveCuisine = async(req, res)=>{
    let result = await Cuisine.create(req.body);
    res.send({success:true, result})
}
let GetCuisine = async(req, res)=>{
    let result = await Cuisine.find();
    res.send({success:true, result})
}
let GetCuisineById = async(req, res)=>{
    let id = req.params.id;
    let result = await Cuisine.find({_id : id});
    res.send({success:true, result : result[0]})
}
let UpdateCuisine = async(req, res)=>{
    let id = req.params.id;
    let result = await Cuisine.updateMany({_id : id},req.body);
    res.send({success:true, result})
}
let DeleteCuisine = async(req, res)=>{
    let id = req.params.id;
    let result = await Cuisine.deleteMany({_id : id});
    res.send({success:true, result})
}

export {SaveCuisine, UpdateCuisine, DeleteCuisine, GetCuisine, GetCuisineById}