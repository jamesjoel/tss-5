import mongoose from "mongoose";
mongoose
.connect("mongodb+srv://jamessteppingstone_db_user:eIKxg3RIloV8T2xM@cluster0.kamyprc.mongodb.net/?appName=Cluster0")
.then(()=>console.log("CONNECTED"))
.catch(err=>console.log("NOT CONNECTE", err));

let UserSchema = mongoose.Schema({
    name : String,
    email : String,
    age : Number
})

let User = mongoose.model("user", UserSchema);

export default User;