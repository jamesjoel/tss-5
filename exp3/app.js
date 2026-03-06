import express from 'express';
import path from 'path'
let app = express();


app.get("/", (req, res)=>{
    res.sendFile(path.resolve()+"/home.html");
})

app.get("/about", (req, res)=>{
    
    res.sendFile(path.resolve()+"/about.html");
})
app.get("/contact", (req, res)=>{
    
    res.sendFile(path.resolve()+"/contact.html");
})


// create my own virtual server
app.listen(5000, ()=>{
    console.log("Server Running");
});