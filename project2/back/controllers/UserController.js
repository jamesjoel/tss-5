import User from "../models/User.js";
import sha1 from 'sha1'
let SaveUser = async(req, res)=>{
    // console.log(req.body)
    delete req.body.repassword;

    req.body.password = sha1(req.body.password)

    let result = await User.create(req.body);
    // { name : "rohit", age : 25}
    res.send({success:true});

}


let CheckUsername = async(req, res)=>{
    let u = req.params.u;
    let result = await User.find({username : u});
    if(result.length > 0){
        res.send({success:false})
    }else{
        
        res.send({success:true})
    }
}

let GetAllUser = async(req, res)=>{
    let result = await User.find();
    res.send({result})
}

export {SaveUser, CheckUsername, GetAllUser}