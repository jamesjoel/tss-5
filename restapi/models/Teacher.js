import mongoose from "../config/conn.js";

let TeacherSchema = mongoose.Schema({
    name : String,
    age : Number,
    salary : Number,
    class : String
}, {timestamps : true})

let Teacher = mongoose.model("teacher", TeacherSchema);

export default Teacher;
