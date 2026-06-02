import User from '../models/User.js'
import jwt from 'jsonwebtoken'

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

export { Profile, EditProfile }