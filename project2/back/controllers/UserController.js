import User from "../models/User.js";
import sha1 from 'sha1'
import SendMail from "../util/SendMail.js";
import jwt from 'jsonwebtoken'
import OtpGen from 'otp-generator'

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

let DeleteAll = async(req, res)=>{
    await User.deleteMany()
    res.send({success:true})
}

let ForgotPassword = async(req, res)=>{
    // console.log(OtpGen.generate(6, { lowerCaseAlphabets : false, upperCaseAlphabets: false, specialChars: false }))
    // return;
    let {username} = req.body;
    let result = await User.find({username : username})
    if(result.length > 0){
        let otp = OtpGen.generate(6, { lowerCaseAlphabets : false, upperCaseAlphabets: false, specialChars: false });
        let obj = {id : result[0]._id};
        let token = jwt.sign(obj, process.env.ENC_KEY);
        await User.updateMany({_id : result[0]._id}, {otp : otp, fptoken : token, isforgotpass : true})
        SendMail(result[0].email, 'Forgot Password', `<h1>${otp}</h1>`);
        res.send({success:true, token:token})
    }else{
        res.send({success:false})
    }
}


let CheckOtp = async(req, res)=>{
    // console.log(req.body);
    // console.log(req.headers.authorization);
    let {otp} = req.body;
    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    let result = await User.find({_id : obj.id });
    if(result[0].otp == otp){
        res.send({success:true})
    }else{
        res.send({success:false});
    }
}

let UpdatePassword = async(req, res)=>{
    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    await User.updateMany({_id : obj.id }, {password : sha1(req.body.password), otp : null, fptoken : '', isforgotpass : false})
    res.send({success:true})

}
export {SaveUser, CheckUsername, UpdatePassword, GetAllUser, DeleteAll, ForgotPassword, CheckOtp}