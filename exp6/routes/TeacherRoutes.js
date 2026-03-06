import express from 'express';

const routes = express.Router();

routes.get("/", (req, res)=>{
    res.send([{name : "gaurav"}]);
})

let demo = ()=>{
    
}


routes.get("/primary", (req, res)=>{
    res.send([{name : "james"}]);
})

export default routes;