import { useState } from "react";
import axios from "axios";
import UnProSer from '../services/UnProtectedServices'
let arr = [
    {
        cuisine : ""
    },
    {
        amenities : ""
    },
    {
        cost : ""
    },
    {
        type : ""
    }

];
let useFilter = async(query)=>{
    console.log(query)
      if(Object.hasOwn(query, "cuisine")){
        arr[0].cuisine = query.cuisine;
      }
      if(Object.hasOwn(query, "amenities")){
        arr[1].amenities = query.amenities;
      }
      if(Object.hasOwn(query, "cost")){
        arr[2].cost = query.cost;
      }
      if(Object.hasOwn(query, "Type")){
        // console.log("**************", query["Type"])
        arr[3].type = query["Type"];
      }
      console.log(arr)

    let response = await UnProSer.get(`/hotelfilter?cuisine=${arr[0].cuisine}&amenities=${arr[1].amenities}&cost=${arr[2].cost}&type=${arr[3].type}`)
    console.log(response.data)
    return response.data.result;
    return [];
}

export default useFilter;

/*
axios.get().then(()=>{
    })

*/