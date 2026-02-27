import express from 'express'
import path from 'path'

let app = express();

let user = [
    {
        name : "rohit",
        city : "indore",
        age : 25
    },
    {
        name : "ajay",
        city : "indore",
        age : 20
    },
    {
        name : "gaurav",
        city : "mumbai",
        age : 27
    }
]

app.get("/api/v1/student", (req, res)=>{
    // res.sendFile()
    res.send(user);
})
app.get("/api/v1/teacher", (req, res)=>{
    // res.sendFile()
    res.send(user);
})
app.get("/api/v1/product", (req, res)=>{
    // res.sendFile()
    res.send(user);
})



app.listen(3000, ()=>{
    console.log("server running");
})