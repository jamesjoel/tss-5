import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import UnProtectedService from '../services/UnProtectedServices'
import './ViewAll.css'
import HotelInfoBox from '../ui/HotelInfoBox';
const ViewAll = () => {
    let [allCus, setAllCus] = useState([]);
    let [allAme, setAllAme] = useState([])
    let [allHotel, setAllHotel] = useState([])
    let [countHotel, setCountHotel] = useState(0);

    useEffect(()=>{
        UnProtectedService
        .get(`/cuisine`)
        .then(response=>{
            setAllCus(response.data.result)
        })
    },[])
    useEffect(()=>{
        UnProtectedService
        .get(`/amenities`)
        .then(response=>{
          console.log(response.data.result)
            setAllAme(response.data.result)
        })
    },[])

    useEffect(()=>{
      GetAllFilterdHotel()
    },[])

    // {type : "Veg", cusion : "Italina"}
    // ?type=Veg&cuision=Ita

    let GetAllFilterdHotel = (obj={})=>{
      let query = new URLSearchParams(obj).toString();
      // console.log(query)
      UnProtectedService
      .get(`/hotelfilter?${query}`)
      .then(response=>{
        setCountHotel(response.data.result.length)
        setAllHotel(response.data.result);
      })
    }

    let obj = {};

   let filter = (e, lable)=>{
    if(e.target.checked){
      obj[lable] = e.target.value;
    }else{
      delete obj[lable]
    }
    GetAllFilterdHotel(obj);
   } 

  return (
    <div className='container py-5' style={{minHeight : 700, marginTop : 100}}>

    <div className="row">
        <div className="col-md-2 m-0 p-0">
          <div className='card p-2 mx-2' style={{backgroundColor : "#151515", border : "1px solid #2d2d2d"}}>
            <h4>Filter</h4>
            <button data-bs-toggle="collapse" data-bs-target="#type" className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Type</button>
            <div className='collapse' id='type'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>

               <div><input id='veg' onChange={e=>filter(e, 'type')} value='Veg' type='checkbox' /> <label for='veg' >Veg</label></div>
               <div><input id='non-veg' onChange={e=>filter(e, 'type')} value='Non-Veg' type='checkbox' /> <label for='non-veg' >Non-Veg</label></div>
              </div>
            </div>

            <button data-bs-toggle="collapse" data-bs-target="#cuisine" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cuisine</button>
            <div className='collapse' id='cuisine'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allCus.map(item=><div><input type='checkbox' /> {item.name}</div>)
                }
               
               
              </div>
            </div>


            <button data-bs-toggle="collapse" data-bs-target="#amenities" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Amenities</button>
            <div className='collapse' id='amenities'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allAme.map(item=><div><input type='checkbox' /> {item.name}</div>)
                }
               
               
              </div>
            </div>
            
            <button data-bs-toggle="collapse" data-bs-target="#cost" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cost</button>
            <div className='collapse' id='cost'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                <div><input type='checkbox' /> 100-300</div>
                <div><input type='checkbox' /> 200-400</div>
                <div><input type='checkbox' /> 400-600</div>
                <div><input type='checkbox' /> 600-800</div>
                <div><input type='checkbox' /> 800-1000</div>
                <div><input type='checkbox' /> 1000 more</div>
              </div>
            </div>
          </div>      

        </div>
        <div className="col-md-10">
          <div className='card p-2 mx-2' style={{backgroundColor : "#151515", border : "1px solid #2d2d2d", minHeight : 650}}>
            <h4>All Hotels ({countHotel})</h4>
            <div className="row isotope-container" >

            {
              allHotel.map(item=><HotelInfoBox item={item}/>    )
            }
            </div>
            
          </div>
        </div>
    </div>
    </div>
  )
}

export default ViewAll