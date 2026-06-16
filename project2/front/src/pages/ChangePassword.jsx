import React, { useState } from 'react'
import ProfileSideBar from '../component/ProfileSideBar'
import { useFormik } from 'formik'
import ChangePasswordSchema from '../schema/ChangePasswrodSchema'
import axios from 'axios'
import ProtectedService from '../services/ProtectedServices'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    let [errMsg, setErrMsg] = useState("")
    let navigate = useNavigate();

    let frm = useFormik({
        validationSchema : ChangePasswordSchema,
        initialValues : {
            password : "",
            repass : "",
            confrepass : ""
        },
        onSubmit : (formData)=>{
            ProtectedService
            .post(`/profile/changepassword`, formData)
            .then(response=>{
                if(response.data.success==true){
                    navigate("/myprofile")
                }else{
                    setErrMsg("Current Password is wrong !")
                }
            })
        }
    })


  return (
    <section id="menu" className="menu section" style={{ minHeight: "750px", marginTop: "100px" }}>
            <div className="container">
                <div className="row">
                    <ProfileSideBar />
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className='p-3'>
                                    
                                    <div className='row p-3' style={{ border: "1px solid #666461" }}>
                                        <form onSubmit={frm.handleSubmit}>
                                        <div className=''>
                                            <h4>Change Your Password</h4>
                                            <div className='mt-3'>
                                                <label>Current Password</label>
                                                <input name='password' onChange={frm.handleChange} type='password' className={'form-control ' + (frm.errors.password && frm.touched.password ? 'is-invalid' : '')} />
                                                {
                                                    frm.errors.password && frm.touched.password
                                                    ?
                                                    <small className='text-danger'>{frm.errors.password}</small>
                                                    :
                                                    ''
                                                }
                                                {
                                                    <small className='text-danger'>{errMsg}</small>
                                                }
                                            </div>
                                            <div className='mt-3'>
                                                <label>New Password</label>
                                                <input name='repass' onChange={frm.handleChange} type='password' className={'form-control '+ (frm.errors.repass && frm.touched.repass ? 'is-invalid' : '')} />
                                                {
                                                    frm.errors.repass && frm.touched.repass
                                                    ?
                                                    <small className='text-danger'>{frm.errors.repass}</small>
                                                    :
                                                    ''
                                                }
                                            </div>
                                            <div className='mt-3'>
                                                <label>Confirm New Password</label>
                                                <input name='confrepass' onChange={frm.handleChange} type='password' className={'form-control ' + (frm.errors.confrepass && frm.touched.confrepass ? 'is-invalid' : '')} />
                                                {
                                                    frm.errors.confrepass && frm.touched.confrepass
                                                    ?
                                                    <small className='text-danger'>{frm.errors.confrepass}</small>
                                                    :
                                                    ''
                                                }
                                            </div>
                                            <button type='submit' className='mt-3 btn btn-primary'>Change</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
  )
}

export default ChangePassword

//  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