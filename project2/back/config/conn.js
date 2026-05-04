// jamessteppingstone_db_user
// mongodb+srv://jamessteppingstone_db_user:GwPVCinM9WymD1Rn@cluster0.u8vsotc.mongodb.net/?appName=Cluster0
import mongoose from "mongoose";

mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("CONNECTED"))
.catch((err)=>console.log("NOT-CONNECTED", err))

export default mongoose;