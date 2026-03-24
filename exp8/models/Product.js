import mongoose from "../config/conn.js";
// import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    title : String,
    category : String,
    price : Number,
    detail : String,
    // createdAt
    // updateAt
}, {collection : "product", timestamps : true})
// products
const Product = mongoose.model("product", ProductSchema);

export default Product;