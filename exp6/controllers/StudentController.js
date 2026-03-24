let Index = (req, res)=>{
    res.send([])
}

let Info = (req, res)=>{
    res.send([{ name : "rohit", age : 25, city : "bhopal"}])
}

export {Index, Info};