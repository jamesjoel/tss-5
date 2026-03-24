import express from 'express'
import AllRoutes from './AllRoutes.js'

let app = express();
app.listen(3000, ()=>console.log("server running"));

app.use(AllRoutes)

/*
username : jamessteppingstone_db_user
password : eIKxg3RIloV8T2xM

*/
