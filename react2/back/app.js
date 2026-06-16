import express from 'express'
import cors from 'cors'
import upload from 'express-fileupload'
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(upload())

app.get("/", (req, res)=>{
    console.log("hello")
})

app.post("/upload", (req, res)=>{
    let a = req.body.name;
    let org = req.files.photo.name; // sdfgsdge.jpg
    let arr = org.split(".");
    let ext = arr[arr.length-1];

    req.files.photo.mv("./photos/"+a+"."+ext, (err)=>{
        if(err){
            console.log(err)
            return;
        }
        console.log("UPLOADED")
    });
})

app.listen(3000, ()=>console.log("Server running"));