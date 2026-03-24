import express from 'express'

let routes = express.Router();

routes.get("/", (req, res)=>{
    res.send([{name : "rohit"}]);
})

export default routes;