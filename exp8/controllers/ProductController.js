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
    let id = req.params.id;
    let result = await Product.find({ _id : id});
    res.send({success:true, result : result});
}
let DeleteProductById = async(req, res)=>{
    let id = req.params.id;
    let result = await Product.deleteMany({_id : id});
    res.send({success:true, result : result});

}
let UpdateProductById = async(req, res)=>{
    let id = req.params.id;
    let result = await Product.updateMany({_id : id}, req.body);
    res.send({success:true, result : result});
}


export {SaveProduct, UpdateProductById, GetAllProduct, GetAllProductById, DeleteProductById}