import Admin from '../models/Admin.js'
import sha1 from 'sha1'
import jwt from 'jsonwebtoken'

let AdminAuth = async(req, res)=>{
    // console.log(req.body)

    let {username, password} = req.body;
    let result = await Admin.find({username : username});
    // result is an Array
    if(result.length > 0){ // username is correct
        if(result[0].password == sha1(password)){
            
            let adminobj = { id : result[0]._id };
            let token = jwt.sign(adminobj, process.env.ENC_KEY);
            res.send({success:true, token:token, name : result[0].name, type : result[0].type})

        }else{ // username is correct but password is incorrect
            res.send({success:false, errType : 2})
        }

    }else{ // username is incorrect
        res.send({success:false, errType : 1})
    }
}

export {AdminAuth}