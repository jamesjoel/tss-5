import express from 'express'

let routes = express.Router();

routes.get("/", (req, res)=>{
    res.send([{name : "gaurav"}]);
})

export default routes;