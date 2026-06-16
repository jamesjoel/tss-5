import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import sha1 from 'sha1'

let Profile = async(req, res)=>{
    let result = await User.find({_id : req.userobj.id }, "-password");
    res.send({success:true, result : result[0]})
    
}

let EditProfile = async(req, res)=>{
    // console.log(req.body)
    // console.log(req.userobj)
    let result = await User.updateMany({_id : req.userobj.id}, req.body);
    res.send({success:true, result : result})

}

let ChangePassword = async(req, res)=>{
    let {password, repass, confrepass} = req.body;
    let result = await User.find({_id : req.userobj.id});
    if(result[0].password == sha1(password)){
        await User.updateMany({_id : req.userobj.id}, {password : sha1(repass)})
        res.send({success:true})
    }else{
        res.send({success:false})
    }
}

export { Profile, EditProfile, ChangePassword }