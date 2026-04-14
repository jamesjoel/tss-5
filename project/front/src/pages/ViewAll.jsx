import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
const ViewAll = () => {
    let [allCus, setAllCus] = useState([]);
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/cuisine`)
        .then(response=>{
            setAllCus(response.data.result)
        })
    },[])
    let [allAme, setAllAme] = useState([])
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/amenities`)
        .then(response=>{
            setAllAme(response.data.result)
        })
    },[])


  return (
    <div className='container py-5' style={{minHeight : 700}}>

    <div className="row">
        <div className="col-md-2">
            <h4>Filter</h4>
            <button data-toggle="collapse" data-target="#type" className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Type</button>
            <div className='collapse' id='type'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>

               <div><input type='checkbox' /> Veg</div>
               <div><input type='checkbox' /> Non-Veg</div>
              </div>
            </div>

            <button data-toggle="collapse" data-target="#cuisine" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cuisine</button>
            <div className='collapse' id='cuisine'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allCus.map(item=><div><input type='checkbox' /> {item.title}</div>)
                }
               
               
              </div>
            </div>


            <button data-toggle="collapse" data-target="#amenities" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Amenities</button>
            <div className='collapse' id='amenities'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allAme.map(item=><div><input type='checkbox' /> {item.title}</div>)
                }
               
               
              </div>
            </div>



            
            <button className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Timing</button>
            <br />
            <button className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cost</button>
            <button className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Location</button>

        </div>
        <div className="col-md-10"></div>
    </div>
    </div>
  )
}

export default ViewAll