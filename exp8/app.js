import express from 'express';
import AllRoutes from './routes/AllRoutes.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(AllRoutes)

const port = process.env.PORT;
app.listen(port, ()=>console.log("server running with port ", port));