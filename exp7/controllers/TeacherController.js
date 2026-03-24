import mongoose from 'mongoose';

mongoose
.connect("mongodb+srv://jamessteppingstone_db_user:eIKxg3RIloV8T2xM@cluster0.kamyprc.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("CONNECTED")
})
.catch((err)=>{
    console.log("NOT CONNECTED ",err)
})

let TeacherSchema = mongoose.Schema({
    name : String,
    salary : Number,
    subject : String,
    class : String
})

let Teacher = mongoose.model("teacher", TeacherSchema);


let SaveTeacher = (req, res)=>{
    Teacher.create({ name : "Gaurav", salary : 12000, subject : "Hindi", class : "6" })
    res.send({success:true});
}

let GetAllTeacher = async(req, res)=>{
    let result = await Teacher.find();
    res.send(result);
}

export {SaveTeacher, GetAllTeacher}