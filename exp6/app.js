import express from 'express';
import AllRoutes from './routes/AllRoutes.js'
const app = express();

app.use(AllRoutes);

const port = 3000;
app.listen(port, ()=>console.log("server running with port ", port));