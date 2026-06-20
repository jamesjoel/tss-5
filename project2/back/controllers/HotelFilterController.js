import Hotels from "../models/Hotel.js";

let AllHotelFilter = async(req, res)=>{
    // console.log(req.query)
    let result = await Hotels.find(req.query);
    res.send({success:true, result});
}

export {AllHotelFilter}