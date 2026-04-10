import { useFormik } from 'formik'
import React from 'react'
import ProtectedService from '../../services/ProtactedService'
import { useNavigate } from 'react-router-dom'

const AddAmenities = () => {
    let navigate = useNavigate();
    let addFrm = useFormik({
        initialValues : {
            title : ""
        },
        onSubmit : (formData)=>{
            ProtectedService
            .post('/amenities', formData)
            .then(response=>{
                // console.log(response.data)
                navigate("/amenities")
            })
        }
    })
  return (
     <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h2 className="mb-0">Add Amenities</h2>
                        <form onSubmit={addFrm.handleSubmit}>
                        <div className="col-md-6 offset-md-3 my-5">
                            <div className='card'>
                            
                            <div className="card-body">
                                <label>Title <span className='text-danger'>{addFrm.errors.title && addFrm.touched.title ? addFrm.errors.title : ''}</span></label>
                                <input name='title' onChange={addFrm.handleChange} type='text' className={'form-control ' + (addFrm.errors.title && addFrm.touched.title ? 'is-invalid' : '')} />
                            </div>
                            <div className="card-footer">
                                <button type='submit' className='btn btn-success'>Add</button>
                            </div>
                        </div>
                        </div>
                        </form>
                    </div>
                    
                </div>
            </div>
  )
}

export default AddAmenities