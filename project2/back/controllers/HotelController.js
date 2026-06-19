import Hotels from "../models/Hotel.js";
import randstr from 'randomstring'
import Path from 'path'

let SaveHotel = async(req, res)=>{
    let result = await Hotels.create(req.body)
    res.send({success:true, result});
}

let GetAllHotel = async(req, res)=>{
    let result = await Hotels.find();
    res.send({success:true, result});

}

let DeleteAllHotel = async(req, res)=>{
    await Hotels.deleteMany();
    res.send({success:true})
}

let UploadCoverImage = async(req, res)=>{
    // console.log(randstr.generate(20));
    // console.log(req.files)
    let id = req.params.id;
    let image = req.files.coverImage;
    let arr = image.name.split(".")
    let ext = arr[arr.length-1]
    let newname = randstr.generate(20)+"."+ext;
    image.mv(Path.resolve()+"/assets/cover/"+newname, async(err)=>{
        if(err)
            console.log(err)
        await Hotels.updateMany({_id : id}, {coverImage : newname});
        res.send({success:true})
    });
}

let UploadMoreImage = async(req, res)=>{
    // console.log(req.files)
    let id = req.params.id;
    let image = req.files.more;
    let arr = image.name.split(".");
    let ext = arr[arr.length-1];
    let newname = randstr.generate(20)+"."+ext;
    image.mv(Path.resolve()+"/assets/more/"+newname, async(err)=>{
        if(err)
            console.log(err);
        // console.log("############")
        // await Hotels.updateMany({_id : id }, { images : [newname]})
        await Hotels.updateMany({_id : id }, { $push : {images : newname}})
    })
}

export {SaveHotel, GetAllHotel, DeleteAllHotel, UploadCoverImage, UploadMoreImage}