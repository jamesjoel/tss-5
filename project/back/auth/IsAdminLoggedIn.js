import jwt from 'jsonwebtoken'
let IsAdminLoggedIn = async(req, res, next)=>{
    if(req.headers.authorization){
        let token = req.headers.authorization;
        let adminobj = jwt.decode(token, process.env.ENC_KEY);
        if(adminobj){
            // continune
            next();
        }
        else{

            res.send({success:false, message : "Un-Authorized User"})
        }
    }
    else{
        res.send({success:false, message : "Un-Authorized User"})
    }
}

export default IsAdminLoggedIn;