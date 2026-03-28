import mongoose from "../config/conn.js";

const UserSchema = mongoose.Schema({
    fullname : String,
    username : String,
    email : String,
    contact : String,
    password : String,
    address : String,
    city : String,
    gender : String
}, { timestamps : true })

const User = mongoose.model("users", UserSchema)

export default User;