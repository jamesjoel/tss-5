import Hotels from "../models/Hotel.js";

let AllHotelFilter = async (req, res) => {
    
    let obj = req.query;
    console.log(obj)
    if (
            obj.cuisine !== undefined && 
            obj.amenities !== undefined && 
            obj.cost !== undefined &&
            obj.type != undefined) 
        {
        let result = []
        let and = [];
        
        if (req.query.cuisine != "") {
            let arr = req.query.cuisine.split(",");
            let findarr = arr.map(item => { return { cuisineId: item } });
            let obj = { $or: findarr }
            and.push(obj)
        }
        if (req.query.amenities && req.query.amenities != "") {
            let arr = req.query.amenities.split(",");
            let findarr = arr.map(item => { return { amenitiesId: item } });
            let obj = { $or: findarr }
            // console.log("AME -------", obj)
            and.push(obj)
        }
        if (req.query.cost && req.query.cost != "") {
            let arr = req.query.cost.split(",");
            let findarr = arr.map(item => { return { cost: item } });
            let obj = { $or: findarr }
            and.push(obj)
        }
        if (req.query.type && req.query.type != "") {
            let arr = req.query.type.split(",");
            let findarr = arr.map(item => { return { type: item } });
            let obj = { $or: findarr }
            and.push(obj)
        }
        // console.log(and)
        result = await Hotels.find({$and : and});


        res.send({ success: true, result });
    }
    else {
        let result = await Hotels.find();
        res.send({ success: true, result });
    }


}

export { AllHotelFilter }

/*

product.find(
        {
            $and : [
                    { 
                        $or : [{ cuisine : "4"}, { cuisine : "8"}] 
                    }, 
                    { 
                        $or : [{ame : "apple"}, {ame : "moto"}] 
                    },
                    {
                        $or : [{cost : ""}, {cost : ""}]
                    }
                ]
        }
    )







let a = ''

if(a){
}


*/