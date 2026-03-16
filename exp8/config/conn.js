import mongoose from "mongoose";
import dns from 'node:dns/promises'
dns.setServers(["8.8.8.8","1.1.1.1"]);
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("CONNECTED"))
.catch(err=>console.log("NOT CONNECTED ", err));

export default mongoose;