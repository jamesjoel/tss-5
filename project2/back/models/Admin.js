import mongoose from '../config/conn.js'

const AdminSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String
})

const Admin = mongoose.model("admin", AdminSchema)

export default Admin;