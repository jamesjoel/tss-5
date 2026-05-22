import User from '../models/User.js'
import sha1 from 'sha1'
import jwt from 'jsonwebtoken'

let Auth = async(req, res)=>{
    // console.log(req.body)
    let {username, password} = req.body;
    let result = await User.find({username : username});
    if(result.length > 0){
        
        if(result[0].password == sha1(password)){
            let id = result[0]._id;
            let obj = { id : id };
            let token = jwt.sign(obj, "the stepping stone")
            res.send({success:true, name : result[0].fullname, token : token})
        }else{

            res.send({success:false, errType : 2});
        }


    }else{ // username is incorrect
        res.send({success:false, errType : 1});
    }

}

export {Auth}