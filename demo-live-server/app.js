import express from 'express'
import cors from 'cors'
import PATH from 'path'
const app = express();

const root = PATH.join(PATH.resolve()+"/dist");



app.use(cors())
app.use(express.static(root))


app.get("/api/v1/student", (req, res)=>{
    let stu = [
        {
            id : 1,
            name : "rohit",
            age : 25
        },
        {
            id : 2,
            name : "amit",
            age : 20
        },
        {
            id : 3,
            name : "jaya",
            age : 27
        }
    ]

    res.send(stu)
})

app.get("/{*splat}", (req, res)=>{
    res.sendFile("index.html", {root});    
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server running");
})