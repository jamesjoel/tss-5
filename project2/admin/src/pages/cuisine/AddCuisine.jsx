import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import CuisineSchema from '../../schema/CuisineSchema'
import axios from 'axios'
import {NavLink, useNavigate, useParams} from 'react-router-dom'



const AddCuisine = () => {

  let [cuisine, setCuisine] = useState({
      name : ""
    })
  let param = useParams();
  let navigate = useNavigate();


  useEffect(()=>{
    if(param.id){
      axios
      .get(`${import.meta.env.VITE_API_URL}/cuisine/${param.id}`)
      .then(response=>{
        // console.log(response.data)
        setCuisine(response.data.result)
      })
    }
  },[])

  let frm = useFormik({
    enableReinitialize : true,
    initialValues : cuisine,
    validationSchema : CuisineSchema,
    onSubmit : (formData)=>{
      if(param.id){
        // put
        axios
        .put(`${import.meta.env.VITE_API_URL}/cuisine/${param.id}`, formData)
        .then(response=>{
          // console.log(response.data)
          navigate("/cuisine")
        })
      }
      else{

        axios
        .post(`${import.meta.env.VITE_API_URL}/cuisine`, formData)
        .then(response=>{
          // console.log(response.data)
          navigate("/cuisine")
        })
      }
    }
  })



  return (
    <div className="container-fluid py-4" style={{minHeight : 700}}>
      <form onSubmit={frm.handleSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h4>{param.id ? "Update" : "Add New"} Cuisines</h4>
              </div>
              <div className="card-body">
                <label>Name {frm.errors.name && frm.touched.name ? <span className='text-danger'>{frm.errors.name}</span> : ''}</label>
                <input value={frm.values.name} name='name' onChange={frm.handleChange} type='text' className={'form-control ' + (frm.errors.name && frm.touched.name ? 'is-invalid' : '')} />
              </div>
              <div className="card-footer">
                <button type='submit' className='btn btn-primary'>{param.id ? "Update" : "Add"}</button>
                {
                  param.id
                  ?
                  <NavLink to="/cuisine" className="btn btn-dark mx-2">Back</NavLink>
                  :
                  ''

                }
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCuisine