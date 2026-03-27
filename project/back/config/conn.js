import mongoose from 'mongoose'

mongoose
.connect("mongodb+srv://jamessteppingstone_db_user:eIKxg3RIloV8T2xM@cluster0.kamyprc.mongodb.net/?appName=Cluster0")
.then(()=>console.log("CONNECTED"))
.catch(err=>console.log("NOT CONNTED", err));

export default mongoose;