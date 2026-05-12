import Hotels from "../models/Hotel.js";

let SaveHotel = async(req, res)=>{
    let result = await Hotels.create(req.body)
    res.send({success:true, result});
}

let GetAllHotel = async(req, res)=>{
    let result = await Hotels.find();
    res.send({success:true, result});

}

export {SaveHotel, GetAllHotel}