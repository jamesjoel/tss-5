import jwt from 'jsonwebtoken'
let SecuredUserApi = async(req, res, next)=>{
    if(req.headers.authorization){
            let token = req.headers.authorization;
            let obj = jwt.decode(token, process.env.ENC_KEY)
            if(obj){
                req.userobj = obj;
                next();
            }else{
                res.send({success:false, msg : "Un-Authorized User"});
            }
    }
    else{
        res.send({success:false, msg : "Un-Authorized User"});
    }
}

export default SecuredUserApi;