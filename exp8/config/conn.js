import mongoose from "mongoose";
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("CONNECTED"))
.catch(err=>console.log("NOT CONNECTED ", err));

export default mongoose;