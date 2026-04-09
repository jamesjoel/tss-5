import User from "../models/User.js";
import sha1 from 'sha1'

let SaveUser = async(req, res)=>{
    delete req.body.repassword;
    
    req.body.password = sha1(req.body.password);
    req.body.username = req.body.username.toLowerCase();

    let result = await User.create(req.body)
    res.send({success:true, result: result})
}

let GetAllUser = async(req, res)=>{
    let result = await User.find();
    res.send({success:true, result})
}

let UsernameExists = async(req, res)=>{
    let u = req.params.u;
    let result = await User.find({username : u }); // []
    if(result.length==0){
        res.send({success:true})
    }else{
        
        res.send({success:false})
    }
}


let DeleteAllUser = async(req, res)=>{
    let result = await User.deleteMany();
    res.send({success:true, msg : "all user deleted"})
}

export {SaveUser, GetAllUser, UsernameExists}
