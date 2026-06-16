import Hotel from '../models/Hotel.js'
let GetHotelDetailById = async(req, res)=>{
    let id = req.params.id;
    let result = await Hotel.find({_id : id}).populate("amenitiesId").populate("cuisineId").exec();
    res.send({success:true, result : result[0]})
}

export {GetHotelDetailById}