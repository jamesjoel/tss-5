import mongoose from "../config/conn.js";

let UserSchema = mongoose.Schema({
    fullname : String,
    username : String,
    email : String,
    password : String,
    
    contact : String,
    address : String,
    city : String,
    gender : String,
}, {timestamps : true})

let User = mongoose.model("user", UserSchema)

export default User;