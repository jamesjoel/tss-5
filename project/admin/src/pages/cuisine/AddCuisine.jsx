import React from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import CuisineSchema from '../../schemas/CuisineSchema'
import axios from 'axios'
const AddCuisine = () => {
    let navigate = useNavigate();
    let addFrm = useFormik({
        validationSchema : CuisineSchema,
        initialValues : {
            title : ""
        },
        onSubmit : (formData)=>{
            axios
            .post(`${import.meta.env.VITE_API_URL}/cuisine`, formData)
            .then(response=>{
                navigate("/cuisine")
            })
        }
    })

  return (
    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h2 className="mb-0">Add Cuisine</h2>
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

export default AddCuisine