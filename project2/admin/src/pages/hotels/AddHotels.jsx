import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom';
const AddHotels = () => {

  let navigate = useNavigate();

  let [allCuisine, setAllCuisine] = useState([])
  let [allAmenities, setAllAmenities] = useState([])


  let frm = useFormik({
      initialValues : {
        name : "",
        person : "",
        contact : "",
        address : "",
        lat : "",
        long : "",
        type : "",
        year : "",
        open : "",
        close : "",
        cost : "",
        desc : "",
        amenitiesId : "",
        cuisineId : "",
      },
      onSubmit : (formData)=>{
        axios
        .post(`${import.meta.env.VITE_API_URL}/hotels`, formData)
        .then(response=>{
          //console.log(response.data)
          navigate("/hotels")
        })
      }
  })

  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_API_URL}/cuisine`)
    .then(response=>{
      setAllCuisine(response.data.result)
    })
  },[])
  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_API_URL}/amenities`)
    .then(response=>{
      setAllAmenities(response.data.result)
    })
  },[])

  let year = Array.from({length : 70})
  let currYear = new Date().getFullYear();

  let openTime = Array.from({length : 24})
  let closeTime = Array.from({length : 24})


  return (
    <div className="container-fluid pt-4" style={{minHeight : 700}}>
      <form onSubmit={frm.handleSubmit}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header pb-0 mb-0">
                <h4>Add New Hotel</h4>
              </div>
              <div className="card-body pt-0">
                <div className='my-2'>
                  <label>Hotel Name</label>
                  <input name='name' onChange={frm.handleChange} type='text' className='form-control' />
                </div>
                <div className='my-2'>
                  <label>Contact Person</label>
                  <input name='person' onChange={frm.handleChange} type='text' className='form-control' />
                </div>
                <div className='my-2'>
                  <label>Contact Number</label>
                  <input name='contact' onChange={frm.handleChange} type='text' className='form-control' />
                </div>
                <div className='my-2'>
                  <label>Cuisine</label><br />
                  {
                    allCuisine.map(item=>{
                      return(
                        <>
                        &nbsp;&nbsp;<input name='cuisineId' onChange={frm.handleChange} value={item._id} type='checkbox' />&nbsp;&nbsp;{item.name}
                        </>
                      )
                    })
                  }
                  
                  
                </div>
                <div className='my-2'>
                  <label>Amenities</label><br />
                  {
                    allAmenities.map(item=>{
                      return(
                        <>
                        &nbsp;&nbsp;<input name='amenitiesId' value={item._id} onChange={frm.handleChange} type='checkbox' />&nbsp;&nbsp;{item.name}
                        </>
                      )
                    })
                  }
                  
                </div>
                <div className='my-2'>
                  <label>Address</label>
                  <textarea name='address' onChange={frm.handleChange} className='form-control' />
                </div>
                <div className='my-2'>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Latitude</label>
                      <input name='lat' onChange={frm.handleChange} type='text' className='form-control' />
                    </div>
                    <div className="col-md-6">
                      <label>Longitude</label>
                      <input name='long' onChange={frm.handleChange} type='text' className='form-control' />
                    </div>
                  </div>
                </div>
                <div className='my-2'>
                  <label>Type</label>
                  <select name='type' onChange={frm.handleChange} className='form-control'>
                    <option>Select</option>
                    <option>Veg</option>
                    <option>Non-Veg</option>
                  </select>
                </div>
                <div className='my-2'>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Open</label>
                      <select name='open' onChange={frm.handleChange} className='form-control' >
                        <option>Select</option>
                        {
                          openTime.map((_, index)=><option>{index+1}:00</option>)
                        }
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Close</label>
                      <select name='close' onChange={frm.handleChange} className='form-control' >
                        <option>Select</option>
                        {
                          closeTime.map((_, index)=><option>{index+1}:00</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div className='my-2'>
                  <label>Established Year</label>
                  <select name='year' onChange={frm.handleChange} className='form-control'>
                    <option>Select</option>
                    {
                      year.map((_, index)=><option>{currYear-index}</option>)
                    }
                  </select>
                </div>
                <div className='my-2'>
                  <label>Cost/Person</label>
                  <select name='cost' onChange={frm.handleChange} className='form-control'>
                    <option>Select</option>
                    <option>100-300</option>
                    <option>200-400</option>
                    <option>400-600</option>
                    <option>600-800</option>
                    <option>800-1000</option>
                    <option>1000 and Above</option>
                  </select>
                </div>
                <div className='my-2'>
                  <label>Description</label>
                  <textarea name='desc' onChange={frm.handleChange} className='form-control' />
                </div>
                
                
                
              </div>
              <div className="card-footer">
                <button className='btn btn-primary' type='submit'>Add</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddHotels