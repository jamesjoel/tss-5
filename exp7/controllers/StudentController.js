import mongoose from "mongoose";

mongoose
.connect("mongodb+srv://jamessteppingstone_db_user:eIKxg3RIloV8T2xM@cluster0.kamyprc.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("CONNECTED")
})
.catch((err)=>{
    console.log("NOT CONNECTED ", err)
})

let StudentSchema = mongoose.Schema({
    name : String,
    age : Number,
    city : String
});
let Student = mongoose.model("student", StudentSchema);

// Model.create({})



let SaveStudent = (req, res)=>{
    Student.create({name : "ajay", age : 22, city : "pune"});
    res.send([{msg : "data saved"}]);
}

let GetAllStudent = async (req, res)=>{
    let result = await Student.find();
    res.send(result);
}



export {SaveStudent, GetAllStudent}

/*


    1. npm i mongoose
    2. connection
    3. model ---- schema + name


*/