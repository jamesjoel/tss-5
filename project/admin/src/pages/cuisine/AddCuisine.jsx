import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import {useNavigate, useParams} from 'react-router-dom'
import CuisineSchema from '../../schemas/CuisineSchema'
import ProtectedService from '../../services/ProtactedService'
import axios from 'axios'
const AddCuisine = () => {
    let param = useParams();
    let navigate = useNavigate();
    let [cus, setCus] = useState({
                title : ""
    })
    useEffect(()=>{
        if(param.id){
            // api
            ProtectedService
            .get(`/cuisine/${param.id}`)
            .then(response=>{
                
                setCus(response.data.result)
            })
        }
    },[])

    let addFrm = useFormik({
        validationSchema : CuisineSchema,
        enableReinitialize : true,
        initialValues : cus,
        onSubmit : (formData)=>{
            if(param.id){
                axios
            .put(`${import.meta.env.VITE_API_URL}/cuisine/${param.id}`, formData)
            .then(response=>{
                navigate("/cuisine")
            })
            }
            else{
                axios
            .post(`${import.meta.env.VITE_API_URL}/cuisine`, formData)
            .then(response=>{
                navigate("/cuisine")
            })
            }
        }
    })

  return (
    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h2 className="mb-0">{ param.id ? "Update" : "Add"} Cuisine</h2>
                        <form onSubmit={addFrm.handleSubmit}>
                        <div className="col-md-6 offset-md-3 my-5">
                            <div className='card'>
                            
                            <div className="card-body">
                                <label>Title <span className='text-danger'>{addFrm.errors.title && addFrm.touched.title ? addFrm.errors.title : ''}</span></label>
                                <input value={addFrm.values.title} name='title' onChange={addFrm.handleChange} type='text' className={'form-control ' + (addFrm.errors.title && addFrm.touched.title ? 'is-invalid' : '')} />
                            </div>
                            <div className="card-footer">
                                <button type='submit' className='btn btn-success'>{param.id ? "Update" : "Add"}</button>
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