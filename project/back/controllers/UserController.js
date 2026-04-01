import User from "../models/User.js";
import sha1 from 'sha1'

let SaveUser = async(req, res)=>{
    delete req.body.repassword;
    
    req.body.password = sha1(req.body.password);

    let result = await User.create(req.body)
    res.send({success:true, result: result})
}

export {SaveUser}