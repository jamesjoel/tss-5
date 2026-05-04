import express from 'express'
import AllRoutes from './routes/AllRoutes.js'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(AllRoutes);



app.listen(process.env.PORT, ()=>console.log("server running with port ", process.env.port));