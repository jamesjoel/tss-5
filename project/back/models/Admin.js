import mongoose from "../config/conn.js";

let AdminSchema = mongoose.Schema({
    username : String,
    password : String,
    name : String,
    type : Number
})

let Admin = mongoose.model("admin", AdminSchema)

export default Admin;