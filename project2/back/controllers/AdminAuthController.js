import Admin from "../models/Admin.js";
import sha1 from 'sha1'
import jwt from 'jsonwebtoken'

let Auth = async(req, res)=>{
    let {username, password} = req.body;
    let result = await Admin.find({username:username});
    if(result.length > 0){
        if(result[0].password == sha1(password)){
            let adminobj = { id : result[0]._id}
            let token = jwt.sign(adminobj, process.env.ENC_KEY)
            res.send({success:true, token : token, name : result[0].name})
        }
        else{
            res.send({success:false, errType : 2})

        }
    }else{
        res.send({success:false, errType : 1})
    }
}

export {Auth}