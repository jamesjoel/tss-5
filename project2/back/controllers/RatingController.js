import Rating from "../models/Rating.js";

let SaveRating = async(req, res)=>{
    // console.log(req.body);
    // console.log(req.userobj);
    req.body.userId = req.userobj.id;
    let result = await Rating.create(req.body);
    res.send({success:true})
}

let GetAllRating = async(req, res)=>{
    let id = req.params.id;
    let result = await Rating.find({hotelId : id}).populate("userId", "fullname").sort({"updatedAt":-1}).exec()
    res.send({success:true, result})
}

export {SaveRating, GetAllRating}