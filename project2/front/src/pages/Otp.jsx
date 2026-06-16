import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UnProtectedServices from '../services/UnProtectedServices'

const Otp = () => {
    let [errMsg, setErrMsg] = useState("")
    let navigate = useNavigate();
    useEffect(()=>{
        
        if(! localStorage.getItem("forgot-pass-token")){
        
            navigate("/login")
        }
    },[])

    let frm = useFormik({
        initialValues : {
            otp : ""
        },
        onSubmit : (formData)=>{
            UnProtectedServices
            .post("/user/checkotp", formData, {
                headers : {Authorization : localStorage.getItem('forgot-pass-token')}
            })
            .then(response=>{
                if(response.data.success==true){
                    navigate("/passwordupdate")
                }else{
                    setErrMsg("OTP is Incorrect")
                }
            })
        }
    })
  return (
    <section id="menu" className="menu section" style={{minHeight : "750px", marginTop : "100px"}}>
        <div className="container">
            <form onSubmit={frm.handleSubmit}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5 border border-warning">
                        <div className="card-header bg-warning">
                            <h3 className='text-dark text-center'>OTP</h3>
                        </div>
                        <div className="card-body">
                            <div className='mt-4'>
                                <label className='my-2'>OTP</label>
                                <input name='otp' onChange={frm.handleChange} type='text' className='form-control bg-gray' />
                                <small className='text-danger'>{errMsg}</small>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type='submit' className='btn btn-dark' style={{borderRadius: 50}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </section>
  )
}

export default Otp