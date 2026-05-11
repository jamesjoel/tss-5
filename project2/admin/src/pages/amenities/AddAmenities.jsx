import React from 'react'
import { useFormik } from 'formik'
import AmenitiesSchema from '../../schema/AmenitiesSchema'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddAmenities = () => {
  let navigate = useNavigate();
  let frm = useFormik({
    initialValues : {
      name : ""
    },
    validationSchema : AmenitiesSchema,
    onSubmit : (formData)=>{
      axios
      .post(`${import.meta.env.VITE_API_URL}/amenities`, formData)
      .then(response=>{
        // console.log(response.data)
        navigate("/amenities")
      })
    }
  })


  return (
    <div className="container-fluid py-4" style={{minHeight : 700}}>
      <form onSubmit={frm.handleSubmit}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h4>Add New Amenities</h4>
              </div>
              <div className="card-body">
                <label>Name {frm.errors.name && frm.touched.name ? <span className='text-danger'>{frm.errors.name}</span> : ''}</label>
                <input name='name' onChange={frm.handleChange} type='text' className={'form-control ' + (frm.errors.name && frm.touched.name ? 'is-invalid' : '')} />
              </div>
              <div className="card-footer">
                <button type='submit' className='btn btn-primary'>Add</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddAmenities