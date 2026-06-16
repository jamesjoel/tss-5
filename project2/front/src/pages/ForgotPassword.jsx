import React from 'react'
import {useFormik} from 'formik'
import UnProtectedServices from '../services/UnProtectedServices'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const ForgotPassword = () => {

    let navigate = useNavigate();

    let [errMsg, setErrMsg] = useState("")

    let frm = useFormik({
        initialValues : {
            username : ""
        },
        onSubmit : (formData)=>{
            UnProtectedServices
            .post('/user/forgotpassword', formData)
            .then(response=>{
                console.log(response.data)
                if(response.data.success==true){
                    localStorage.setItem("forgot-pass-token", response.data.token);
                    navigate("/otp")    
                }else{
                    setErrMsg("This Username is invalid")
                }
            })
        }
    })


  return (
    <section id="menu" className="menu section" style={{minHeight : "750px", marginTop : "100px"}}>
        <div className="container">
            
            <div className="row">
                <form onSubmit={frm.handleSubmit}>
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5 border border-warning">
                        <div className="card-header bg-warning">
                            <h3 className='text-dark text-center'>Forgot Password</h3>
                        </div>
                        <div className="card-body">
                            <div className='mt-4'>
                                <label className='my-2'>Username/Email</label>
                                <input type='text' name='username' onChange={frm.handleChange} className='form-control bg-gray' />
                                <small className='text-danger'>{errMsg}</small>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type='submit' className='btn btn-dark' style={{borderRadius: 50}}>Next</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword