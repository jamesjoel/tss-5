import express from 'express'
import AllRoutes from './routes/AllRoutes.js'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(AllRoutes);



// let PORT = process.env.PORT;
let PORT = 3000;
app.listen(PORT, ()=>{
    console.log("server running with port ", PORT)
});