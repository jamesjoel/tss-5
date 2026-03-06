import Product from "../models/Product.js";

let SaveProduct = async(req, res)=>{
    let result = await Product.create(req.body);
    res.send({success:true, result : result});
}

let GetAllProduct = async(req, res)=>{
    let result = await Product.find();
    res.send({success:true, result : result});
}

let GetAllProductById = async(req, res)=>{
    // console.log(req.params);
    let x = req.params.a;
    let result = await Product.find({ _id : x});
    res.send({success:true, result : result});
}

export {SaveProduct, GetAllProduct, GetAllProductById}