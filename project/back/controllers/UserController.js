import User from "../models/User.js";

let SaveUser = async(req, res)=>{
    delete req.body.repassword;
    
    let result = await User.create(req.body)
    res.send({success:true, result: result})
}

export {SaveUser}